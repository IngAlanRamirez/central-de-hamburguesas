'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store/cart'
import { CartItem } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'
import { X } from 'lucide-react'

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.totalItems())
  const drawerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Guardar el elemento que abrió el drawer para restaurar foco al cerrar
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement
    } else if (triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [isOpen])

  // Enfocar el drawer al abrir y atrapar foco
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return

    const drawer = drawerRef.current

    // Enfocar el primer botón (cerrar)
    const closeBtn = drawer.querySelector('button') as HTMLElement | null
    closeBtn?.focus()

    // Focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)

    // Inert el contenido detrás del drawer para screen readers
    const main = document.querySelector<HTMLElement>('main, [role="main"]')
    if (main) main.inert = true

    return () => {
      document.removeEventListener('keydown', handleTab)
      if (main) main.inert = false
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeCart])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1998]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={closeCart}
        aria-hidden="true"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Drawer */}
      <motion.aside
        ref={drawerRef}
        className="fixed right-0 top-0 z-[1999] h-full w-full max-w-md bg-cream shadow-2xl"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        role="dialog"
        aria-label="Mi Pedido"
        aria-modal="true"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b-2 border-primary bg-gradient-to-r from-cream to-cream-dark p-6">
          <h2 className="font-display text-3xl uppercase tracking-wider text-primary">
            Mi Pedido
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 transition-colors hover:bg-error hover:text-error-content"
            aria-label="Cerrar carrito"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        {/* Content */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-text-muted/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="text-xl font-bold text-text">Tu carrito está vacío</p>
            <p className="text-sm text-text-muted">
              Agregá productos del menú para armar tu pedido
            </p>
            <button
              onClick={closeCart}
              className="mt-4 rounded-lg border-2 border-primary px-6 py-3 font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/5"
            >
              Explorar el menú
            </button>
          </div>
        ) : (
          /* Items List */
          <div className="flex h-[calc(100vh-280px)] flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-text-muted">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer with Summary */}
            <div className="flex-shrink-0 border-t-2 border-primary bg-cream p-6">
              <CartSummary />
            </div>
          </div>
        )}
      </motion.aside>
    </>
  )
}
