'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Printer, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'

/** Escapa caracteres HTML para prevenir XSS en el ticket imprimible */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildPrintHtml(items: CartItem[], total: number): string {
  const now = new Date()
  const dateStr = now.toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('es-MX', {
    hour: '2-digit', minute: '2-digit',
  })

  const rows = items
    .map(
      (item) => `
        <tr>
          <td class="qty">${item.quantity}</td>
          <td class="product">
            <div class="name">${escapeHtml(item.title)}</div>
            ${item.description ? `<div class="desc">${escapeHtml(item.description)}</div>` : ''}
          </td>
          <td class="price">$${item.price * item.quantity}</td>
        </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Central de Hamburguesas — Pedido</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex; justify-content: center;
      padding: 40px 16px;
      color: #1a1a1a;
    }
    .ticket { width: 100%; max-width: 380px; }
    .header { text-align: center; margin-bottom: 24px; }
    .header img { max-width: 180px; height: auto; margin-bottom: 12px; }
    .header h1 {
      font-family: 'Arial Black', 'Impact', sans-serif;
      font-size: 24px; letter-spacing: 1px; text-transform: uppercase;
      color: #C41E3A;
    }
    .header .sub { font-size: 12px; color: #666; margin-top: 4px; }
    .header .date { font-size: 11px; color: #999; }
    .divider { border: none; border-top: 1px dashed #ccc; margin: 16px 0; }
    table { width: 100%; border-collapse: collapse; }
    thead th {
      font-size: 10px; text-transform: uppercase; letter-spacing: 1px;
      color: #999; text-align: left; padding-bottom: 8px;
    }
    thead th:last-child { text-align: right; }
    thead th:first-child { width: 40px; text-align: center; }
    tbody tr { border-bottom: 1px solid #f0f0f0; }
    tbody td { padding: 8px 0; vertical-align: top; }
    td.qty { text-align: center; font-weight: 700; font-size: 14px; width: 40px; }
    td.product { font-size: 14px; }
    .name { font-weight: 600; }
    .desc { font-size: 11px; color: #999; margin-top: 2px; }
    td.price {
      text-align: right; font-family: 'Courier New', monospace;
      font-weight: 700; font-size: 14px; white-space: nowrap;
    }
    .total-row { margin-top: 16px; padding-top: 16px; }
    .total-row .label { font-size: 20px; font-weight: 800; text-transform: uppercase; }
    .total-row .amount { font-size: 28px; font-weight: 800; color: #C41E3A; text-align: right; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; font-style: italic; color: #999; }
    .footer .web { font-size: 10px; color: #ccc; margin-top: 4px; }
    @page { margin: 1cm; }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="header">
      <img src="${window.location.origin}/Logo.png" alt="Central de Hamburguesas">
      <h1>Central de Hamburguesas</h1>
      <p class="sub">Tu pedido</p>
      <p class="date">${dateStr} — ${timeStr}</p>
    </div>
    <hr class="divider">
    <table>
      <thead>
        <tr>
          <th>Cant</th>
          <th>Producto</th>
          <th>Importe</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <hr class="divider">
    <table class="total-row">
      <tr>
        <td class="label">Total</td>
        <td class="amount">$${total}</td>
      </tr>
    </table>
    <div class="footer">
      <p>¡Gracias por tu preferencia!</p>
      <p class="web">centraldehamburguesas.com</p>
    </div>
  </div>
</body>
</html>`
}

import type { CartItem } from '@/lib/types/cart'

export function Receipt({ onClose }: { onClose?: () => void }) {
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())

  const handlePrint = () => {
    const html = buildPrintHtml(items, totalPrice)
    const printWin = window.open('', '_blank')
    if (!printWin) {
      // Popup bloqueado — fallback a window.print directamente
      window.print()
      return
    }

    printWin.document.write(html)
    printWin.document.close()

    const doPrint = () => {
      printWin.print()
      printWin.onafterprint = () => printWin.close()
    }

    // Esperar a que cargue la imagen del logo
    if (printWin.document.readyState === 'complete') {
      doPrint()
    } else {
      printWin.onload = doPrint
    }
  }

  if (items.length === 0) return null

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('es-MX', {
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Header del modal */}
      <div className="mb-4 flex w-full max-w-sm items-center justify-between">
        <h2 className="font-display text-xl uppercase tracking-wider text-white">
          Vista previa
        </h2>
        <button
          onClick={onClose}
          className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Ticket preview — animación tipo terminal Mercado Libre */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 1.8, ease: 'linear' }}
        className="relative mx-auto w-full max-w-sm"
      >
        {/* Print head — línea roja que simula el cabezal térmico */}
        <motion.div
          className="pointer-events-none absolute left-0 right-0 z-10"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.8, ease: 'linear' }}
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C41E3A] to-transparent opacity-60" />
          <div className="mx-auto h-1 w-1/2 bg-gradient-to-r from-transparent via-[#C41E3A]/20 to-transparent blur-sm" />
        </motion.div>

        <div
          className="overflow-y-auto rounded-xl bg-white p-8 shadow-2xl"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          <div className="text-center">
            <div className="relative mx-auto mb-2 h-16 w-48">
              <Image
                src="/Logo.png"
                alt="Central de Hamburguesas"
                fill
                className="object-contain"
                priority
                sizes="192px"
              />
            </div>
            <h1 className="font-display text-2xl uppercase tracking-wider text-[#C41E3A]">
              Central de Hamburguesas
            </h1>
            <p className="mt-1 font-body text-xs text-gray-500">Tu pedido</p>
            <p className="font-body text-xs text-gray-400">
              {dateStr} — {timeStr}
            </p>
          </div>

          <div className="my-4 border-t border-dashed border-gray-300" />

          <div className="space-y-3">
            <div className="flex items-center gap-4 font-body text-xs font-semibold uppercase tracking-wider text-gray-400">
              <span className="w-8 text-center">Cant</span>
              <span className="flex-1">Producto</span>
              <span className="w-20 text-right">Importe</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border-b border-gray-100 pb-2 font-body text-sm"
              >
                <span className="w-8 pt-0.5 text-center font-bold text-gray-800">
                  {item.quantity}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-gray-400">{item.description}</p>
                  )}
                </div>
                <span className="w-20 pt-0.5 text-right font-mono font-bold text-gray-900">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-dashed border-gray-300" />

          <div className="flex items-center justify-between">
            <span className="font-display text-xl uppercase tracking-wide text-gray-900">Total</span>
            <span className="font-mono text-3xl font-bold text-[#C41E3A]">${totalPrice}</span>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body text-xs italic text-gray-400">¡Gracias por tu preferencia!</p>
            <p className="mt-1 font-body text-[10px] text-gray-300">centraldehamburguesas.com</p>
          </div>
        </div>
      </motion.div>

      {/* Botones */}
      <div className="mt-4 flex w-full max-w-sm gap-3">
        <Button onClick={onClose} variant="secondary" size="lg" className="flex-1">
          Cancelar
        </Button>
        <Button onClick={handlePrint} variant="primary" size="lg" className="flex-1 gap-2">
          <Printer className="h-5 w-5" />
          Imprimir
        </Button>
      </div>
    </div>
  )
}
