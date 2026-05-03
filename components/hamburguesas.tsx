'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { burgers, type MeatType, type BurgerProduct } from '@/lib/data/burgers'
import type { CartItem } from '@/lib/types/cart'

function BurgerCard({ burger, index }: { burger: BurgerProduct; index: number }) {
  const [meat, setMeat] = useState<MeatType>(burger.meatOptions[0])
  const [selections, setSelections] = useState<Record<string, string[]>>({})
  const addItem = useCartStore((s) => s.addItem)

  const cartId = `${burger.id}-${meat.toLowerCase()}`
  const isSelected = (g: string, o: string) => (selections[g] ?? []).includes(o)

  const toggleExtra = (g: string, o: string, max: number) => {
    setSelections((prev) => {
      const cur = prev[g] ?? []
      return cur.includes(o)
        ? { ...prev, [g]: cur.filter((s) => s !== o) }
        : { ...prev, [g]: max === 1 ? [o] : [...cur, o] }
    })
  }

  const buildDesc = () => {
    const parts = [`Carne: ${meat}`]
    burger.extraGroups?.forEach((group) => {
      const sel = selections[group.id]
      if (sel?.length) parts.push(sel.join(' + '))
    })
    return parts.join(' | ')
  }

  const handleAdd = () => {
    const desc = buildDesc()
    addItem({
      id: cartId,
      title: burger.name,
      description: desc,
      price: burger.basePrice,
      priceDisplay: `$${burger.basePrice}`,
      image: burger.image,
      quantity: 1,
      message: `Hola, quiero pedir ${burger.name} (${desc})`,
    })
  }

  return (
    <ProductCard
      name={burger.name}
      price={burger.basePrice}
      image={burger.image}
      badge={burger.badge}
      cartId={cartId}
      onAdd={handleAdd}
      index={index}
    >
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
          {burger.meatOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setMeat(opt)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-all',
                meat === opt
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-cream text-text-muted hover:bg-cream-dark'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Extras (Hawaiana) */}
      {burger.extraGroups?.map((group) => (
        <div key={group.id} className="mt-3">
          <span className="text-xs font-medium text-text-muted">{group.label}</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {group.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
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
    </ProductCard>
  )
}

export default function Hamburguesas() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {burgers.map((b, i) => (
        <BurgerCard key={b.id} burger={b} index={i} />
      ))}
    </div>
  )
}
