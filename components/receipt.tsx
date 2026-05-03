'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/cart'

export function Receipt() {
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const receiptRef = useRef<HTMLDivElement>(null)

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })

  useEffect(() => {
    const handleAfterPrint = () => {
      // Cierra la ventana tras imprimir
      window.close()
    }

    window.addEventListener('afterprint', handleAfterPrint)
    window.print()

    return () => window.removeEventListener('afterprint', handleAfterPrint)
  }, [])

  if (items.length === 0) return null

  return (
    <div
      ref={receiptRef}
      data-print-root
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white print:bg-white"
    >
      <div className="mx-auto w-full max-w-sm bg-white p-8 print:p-4">
        {/* Header — Logo + Nombre */}
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

        {/* Separador */}
        <div className="my-4 border-t border-dashed border-gray-300" />

        {/* Items */}
        <div className="space-y-3">
          {/* Header de columnas */}
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

        {/* Separador */}
        <div className="my-4 border-t border-dashed border-gray-300" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl uppercase tracking-wide text-gray-900">
            Total
          </span>
          <span className="font-mono text-3xl font-bold text-[#C41E3A]">
            ${totalPrice}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-body text-xs italic text-gray-400">
            ¡Gracias por tu preferencia!
          </p>
          <p className="mt-1 font-body text-[10px] text-gray-300">
            centraldehamburguesas.com
          </p>
        </div>

        {/* Print hint — se oculta al imprimir */}
        <p className="mt-6 text-center font-body text-[10px] text-gray-300 print:hidden">
          {items.length === 1 ? '1 producto' : `${items.length} productos`} — La
          impresión comenzará automáticamente
        </p>
      </div>
    </div>
  )
}
