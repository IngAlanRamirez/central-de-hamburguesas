'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { QuantityPill } from '@/components/ui/quantity-pill'
import { useCartStore } from '@/lib/store/cart'
import { useCartHydrated } from '@/lib/utils/cart-utils'
import { burgers, type MeatType, type BurgerProduct } from '@/lib/data/burgers'
import type { CartItem } from '@/lib/types/cart'

/* -------------------------------------------------------------------------- */
/*  Inner card — manages its own selection state                             */
/* -------------------------------------------------------------------------- */

function BurgerCard({
  burger,
  index,
}: {
  burger: BurgerProduct
  index: number
}) {
  const [meat, setMeat] = useState<MeatType>(burger.meatOptions[0])
  const [selections, setSelections] = useState<Record<string, string[]>>({})

  const hydrated = useCartHydrated()
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const cartId = burger.id + '-' + meat.toLowerCase()
  const cartItem = items.find((i) => i.id === cartId)

  /* ------ Extra toggle helper ------ */
  const toggleExtra = (groupId: string, optionId: string, maxSelect: number) => {
    setSelections((prev) => {
      const current = prev[groupId] ?? []
      const isSelected = current.includes(optionId)

      if (isSelected) {
        const next = current.filter((s) => s !== optionId)
        return { ...prev, [groupId]: next }
      }

      return {
        ...prev,
        [groupId]: maxSelect === 1 ? [optionId] : [...current, optionId],
      }
    })
  }

  /* ------ Build description line ------ */
  const buildDescription = () => {
    const parts: string[] = [`Carne: ${meat}`]

    if (burger.extraGroups) {
      for (const group of burger.extraGroups) {
        const selected = selections[group.id]
        if (selected && selected.length > 0) {
          parts.push(selected.join(' + '))
        }
      }
    }

    return parts.join(' | ')
  }

  /* ------ Add to cart ------ */
  const handleAddToCart = () => {
    const desc = buildDescription()

    const cartPayload: CartItem = {
      id: cartId,
      title: burger.name,
      description: desc,
      price: burger.basePrice,
      priceDisplay: `$${burger.basePrice}`,
      image: burger.image,
      quantity: 1,
      message: `Hola, quiero pedir ${burger.name} (${desc})`,
    }

    addItem(cartPayload)
  }

  /* ------ Is option selected? ------ */
  const isSelected = (groupId: string, optionId: string) =>
    (selections[groupId] ?? []).includes(optionId)

  return (
    <AnimateOnScroll delay={index * 100} direction="fade" className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-dark transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary hover:shadow-xl border-2 border-transparent">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          <Image
            src={burger.image}
            alt={burger.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Badge */}
          {burger.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
              {burger.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl uppercase tracking-wide text-text">
              {burger.name}
            </h3>
            <span className="shrink-0 font-mono text-lg font-bold text-primary">
              ${burger.basePrice}
            </span>
          </div>

          {/* Double meat / dressing note */}
          <div className="mt-1 space-y-0.5">
            {burger.isDoubleMeat && (
              <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Doble porción de carne
              </span>
            )}
            {burger.dressing && (
              <p className="text-xs italic text-text-muted">+ {burger.dressing}</p>
            )}
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
              {burger.ingredients.join(' · ')}
            </p>
          </details>

          {/* Meat selector */}
          <div className="mt-3">
            <span className="text-xs font-medium text-text-muted">Elegí tu carne</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {burger.meatOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setMeat(option)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium transition-all',
                    meat === option
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-cream text-text-muted hover:bg-cream-dark'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Extras (Hawaiana) */}
          {burger.extraGroups?.map((group) => (
            <div key={group.id} className="mt-3">
              <span className="text-xs font-medium text-text-muted">
                {group.label}
              </span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {group.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleExtra(group.id, opt.id, group.maxSelect)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium transition-all',
                      isSelected(group.id, opt.id)
                        ? 'bg-secondary text-accent shadow-sm'
                        : 'bg-cream text-text-muted hover:bg-cream-dark'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

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

/* -------------------------------------------------------------------------- */
/*  Grid                                                                      */
/* -------------------------------------------------------------------------- */

export default function Hamburguesas() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {burgers.map((burger, i) => (
        <BurgerCard key={burger.id} burger={burger} index={i} />
      ))}
    </div>
  )
}
