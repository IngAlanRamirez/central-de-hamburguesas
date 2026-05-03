'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { QuantityPill } from '@/components/ui/quantity-pill'
import { useCartStore } from '@/lib/store/cart'
import { useCartHydrated } from '@/lib/utils/cart-utils'
import { papas, type PapaProduct } from '@/lib/data/papas'
import { sauceOptions } from '@/lib/data/wings'
import type { CartItem } from '@/lib/types/cart'

function PapaCard({ papa, index }: { papa: PapaProduct; index: number }) {
  const [sauce, setSauce] = useState(sauceOptions[0])
  const [conToppings, setConToppings] = useState(true)

  const hydrated = useCartHydrated()
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const cartId = papa.hasSauceChoice
    ? `${papa.id}-${sauce.id}`
    : `${papa.id}${conToppings ? '' : '-solas'}`
  const cartItem = items.find((i) => i.id === cartId)

  const buildDescription = () => {
    if (papa.hasSauceChoice) return `Boneless con salsa ${sauce.label}`
    return conToppings ? 'Con toppings' : 'Solas'
  }

  const handleAddToCart = () => {
    const desc = buildDescription()

    const cartPayload: CartItem = {
      id: cartId,
      title: papa.name,
      description: desc,
      price: papa.basePrice,
      priceDisplay: `$${papa.basePrice}`,
      image: papa.image,
      quantity: 1,
      message: `Hola, quiero pedir ${papa.name} (${desc})`,
    }

    addItem(cartPayload)
  }

  return (
    <AnimateOnScroll delay={index * 100} direction="fade" className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-dark transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary hover:shadow-xl border-2 border-transparent">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          <Image
            src={papa.image}
            alt={papa.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {papa.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
              {papa.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl uppercase tracking-wide text-text">
              {papa.name}
            </h3>
            <span className="shrink-0 font-mono text-lg font-bold text-primary">
              ${papa.basePrice}
            </span>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            {papa.description}
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
              {papa.ingredients.join(' · ')}
            </p>
          </details>

          {/* Topping choice (Francesas / Gajo) */}
          {papa.hasToppingChoice && (
            <div className="mt-3">
              <span className="text-xs font-medium text-text-muted">Presentación</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <button
                  onClick={() => setConToppings(false)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-all',
                    !conToppings
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-cream text-text-muted hover:bg-cream-dark'
                  )}
                >
                  Solas
                </button>
                <button
                  onClick={() => setConToppings(true)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-all',
                    conToppings
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-cream text-text-muted hover:bg-cream-dark'
                  )}
                >
                  Con toppings
                </button>
              </div>
            </div>
          )}

          {/* Sauce choice (Central) */}
          {papa.hasSauceChoice && (
            <div className="mt-3">
              <span className="text-xs font-medium text-text-muted">Elegí tu salsa para los boneless</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {sauceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSauce(opt)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium transition-all',
                      sauce.id === opt.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-cream text-text-muted hover:bg-cream-dark'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1" />

          {/* Add to cart */}
          <div className="mt-auto pt-4">
            {hydrated && cartItem ? (
              <QuantityPill
                quantity={cartItem.quantity}
                onIncrement={() => incrementQuantity(cartId)}
                onDecrement={() => decrementQuantity(cartId)}
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

export default function Papas() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {papas.map((papa, i) => (
        <PapaCard key={papa.id} papa={papa} index={i} />
      ))}
    </div>
  )
}
