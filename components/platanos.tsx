'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { platanos, type PlatanoProduct } from '@/lib/data/platanos'
import type { CartItem } from '@/lib/types/cart'

function PlatanoCard({ platano, index }: { platano: PlatanoProduct; index: number }) {
  const [mermelada, setMermelada] = useState(platano.mermeladaOptions?.[0]?.id ?? '')
  const addItem = useCartStore((s) => s.addItem)

  const cartId = platano.id + (mermelada ? `-${mermelada}` : '')
  const fruitLabel = platano.mermeladaOptions?.find((f) => f.id === mermelada)?.label
  const desc = fruitLabel || platano.description

  const handleAdd = () => {
    addItem({
      id: cartId,
      title: platano.name,
      description: desc,
      price: platano.basePrice,
      priceDisplay: `$${platano.basePrice}`,
      image: platano.image,
      quantity: 1,
      message: `Hola, quiero pedir ${platano.name}${desc ? ` (${desc})` : ''}`,
    })
  }

  return (
    <ProductCard
      name={platano.name}
      price={platano.basePrice}
      image={platano.image}
      badge={platano.badge}
      description={platano.description}
      ingredients={platano.ingredients}
      cartId={cartId}
      onAdd={handleAdd}
      index={index}
    >
      {platano.mermeladaOptions && (
        <div className="mt-3">
          <span className="text-xs font-medium text-text-muted">Elegí tu mermelada</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {platano.mermeladaOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMermelada(opt.id)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all',
                  mermelada === opt.id
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

export default function Platanos() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {platanos.map((p, i) => (
        <PlatanoCard key={p.id} platano={p} index={i} />
      ))}
    </div>
  )
}
