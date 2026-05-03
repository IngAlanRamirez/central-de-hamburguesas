'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { QuantityPill } from '@/components/ui/quantity-pill'
import { useCartStore } from '@/lib/store/cart'
import { useCartHydrated } from '@/lib/utils/cart-utils'
import { bebidas, type BebidaProduct } from '@/lib/data/bebidas'
import type { CartItem } from '@/lib/types/cart'

function BebidaCard({ bebida, index }: { bebida: BebidaProduct; index: number }) {
  const hydrated = useCartHydrated()
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const cartItem = items.find((i) => i.id === bebida.id)

  const handleAddToCart = () => {
    const cartPayload: CartItem = {
      id: bebida.id,
      title: bebida.name,
      description: bebida.description,
      price: bebida.basePrice,
      priceDisplay: `$${bebida.basePrice}`,
      image: bebida.image,
      quantity: 1,
      message: `Hola, quiero pedir ${bebida.name}`,
    }

    addItem(cartPayload)
  }

  return (
    <AnimateOnScroll delay={index * 100} direction="fade" className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-dark transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary hover:shadow-xl border-2 border-transparent">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          <Image
            src={bebida.image}
            alt={bebida.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {bebida.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
              {bebida.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl uppercase tracking-wide text-text">
              {bebida.name}
            </h3>
            <span className="shrink-0 font-mono text-lg font-bold text-primary">
              ${bebida.basePrice}
            </span>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            {bebida.description}
          </p>

          {/* Ingredients */}
          <details className="group/details mt-2">
            <summary className="cursor-pointer text-xs font-medium text-text-muted transition-colors hover:text-text [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-1">
                <svg
                  className="h-3 w-3 transition-transform group-open/details:rotate-90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                Ingredientes
              </span>
            </summary>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {bebida.ingredients.join(' · ')}
            </p>
          </details>

          <div className="flex-1" />

          {/* Add to cart */}
          <div className="mt-auto pt-4">
            {hydrated && cartItem ? (
              <QuantityPill
                quantity={cartItem.quantity}
                onIncrement={() => incrementQuantity(bebida.id)}
                onDecrement={() => decrementQuantity(bebida.id)}
                className="w-full justify-center"
              />
            ) : (
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            )}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  )
}

export default function Bebidas() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bebidas.map((bebida, i) => (
        <BebidaCard key={bebida.id} bebida={bebida} index={i} />
      ))}
    </div>
  )
}
