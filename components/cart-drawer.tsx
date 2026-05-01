'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { CartItem } from '@/components/cart-item'
import { CartSummary } from '@/components/cart-summary'
import { X } from 'lucide-react'

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const totalItems = useCartStore((state) => state.totalItems())
  
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
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[1998] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[1999] h-full w-full max-w-md bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
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
              Agregá combos para comenzar tu pedido
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
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            {/* Footer with Summary */}
            <div className="flex-shrink-0 border-t-2 border-primary bg-cream p-6">
              <CartSummary />
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
