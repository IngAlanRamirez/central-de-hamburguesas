'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { crepas, type CrepaProduct } from '@/lib/data/crepas'
import type { CartItem } from '@/lib/types/cart'

function CrepaCard({ crepa, index }: { crepa: CrepaProduct; index: number }) {
  const [fruit, setFruit] = useState(crepa.fruitOptions?.[0]?.id ?? '')
  const addItem = useCartStore((s) => s.addItem)

  const cartId = crepa.id + (fruit ? `-${fruit}` : '')
  const fruitLabel = crepa.fruitOptions?.find((f) => f.id === fruit)?.label
  const desc = fruitLabel || crepa.description

  const handleAdd = () => {
    addItem({
      id: cartId,
      title: crepa.name,
      description: desc,
      price: crepa.basePrice,
      priceDisplay: `$${crepa.basePrice}`,
      image: crepa.image,
      quantity: 1,
      message: `Hola, quiero pedir ${crepa.name}${desc ? ` (${desc})` : ''}`,
    })
  }

  return (
    <ProductCard
      name={crepa.name}
      price={crepa.basePrice}
      image={crepa.image}
      badge={crepa.badge}
      description={crepa.description}
      ingredients={crepa.ingredients}
      cartId={cartId}
      onAdd={handleAdd}
      index={index}
    >
      {crepa.fruitOptions && (
        <div className="mt-3">
          <span className="text-xs font-medium text-text-muted">Elegí tu fruta</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {crepa.fruitOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFruit(opt.id)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all',
                  fruit === opt.id
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
    </ProductCard>
  )
}

export default function Crepas() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {crepas.map((c, i) => (
        <CrepaCard key={c.id} crepa={c} index={i} />
      ))}
    </div>
  )
}
