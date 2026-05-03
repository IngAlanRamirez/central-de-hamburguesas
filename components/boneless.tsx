'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { QuantityPill } from '@/components/ui/quantity-pill'
import { useCartStore } from '@/lib/store/cart'
import {
  bonelessProduct,
  sauceOptions,
  bonelessExtras,
  type SauceOption,
} from '@/lib/data/boneless'
import type { CartItem } from '@/lib/types/cart'

export default function Boneless() {
  const [sauce, setSauce] = useState<SauceOption>(sauceOptions[0])
  const [withFries, setWithFries] = useState(false)

  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const finalPrice = bonelessProduct.basePrice + (withFries ? 30 : 0)
  const cartId = `boneless-${sauce.id}${withFries ? '-papas' : ''}`
  const cartItem = items.find((i) => i.id === cartId)

  const buildDescription = () => {
    const parts = [`Salsa ${sauce.label}`]
    if (withFries) parts.push('+ Papas fritas')
    return parts.join(' | ')
  }

  const handleAddToCart = () => {
    const desc = buildDescription()

    const cartPayload: CartItem = {
      id: cartId,
      title: bonelessProduct.name,
      description: desc,
      price: finalPrice,
      priceDisplay: `$${finalPrice}`,
      image: bonelessProduct.image,
      quantity: 1,
      message: `Hola, quiero pedir Boneless (${desc}) = $${finalPrice}`,
    }

    addItem(cartPayload)
  }

  return (
    <div className="mx-auto max-w-md">
      <AnimateOnScroll direction="fade" className="h-full">
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-dark transition-all duration-300 ease-out hover:scale-[1.02] hover:border-primary hover:shadow-xl border-2 border-transparent">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
            <Image
              src={bonelessProduct.image}
              alt={bonelessProduct.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {bonelessProduct.badge && (
              <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
                {bonelessProduct.badge}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-xl uppercase tracking-wide text-text">
                {bonelessProduct.name}
              </h3>
              <span className="shrink-0 font-mono text-lg font-bold text-primary">
                ${finalPrice}
              </span>
            </div>

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
                {bonelessProduct.ingredients.join(' · ')} · Boneless
              </p>
            </details>

            {/* Sauce selector */}
            <div className="mt-3">
              <span className="text-xs font-medium text-text-muted">Elegí tu salsa</span>
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

            {/* Extras - Papas fritas */}
            <div className="mt-3">
              <span className="text-xs font-medium text-text-muted">Extra</span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {bonelessExtras.map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => setWithFries(!withFries)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
                      withFries
                        ? 'bg-secondary text-accent shadow-sm'
                        : 'bg-cream text-text-muted hover:bg-cream-dark'
                    )}
                  >
                    {withFries && <Check className="h-3 w-3" />}
                    {extra.label} (+${extra.price})
                  </button>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Add to cart */}
            <div className="mt-auto pt-4">
              {cartItem ? (
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
                  Agregar — ${finalPrice}
                </Button>
              )}
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
