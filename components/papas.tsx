'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { papas, type PapaProduct } from '@/lib/data/papas'
import { sauceOptions } from '@/lib/data/wings'
import type { CartItem } from '@/lib/types/cart'

function PapaCard({ papa, index }: { papa: PapaProduct; index: number }) {
  const [sauce, setSauce] = useState(sauceOptions[0])
  const [conToppings, setConToppings] = useState(true)
  const addItem = useCartStore((s) => s.addItem)

  const cartId = papa.hasSauceChoice
    ? `${papa.id}-${sauce.id}`
    : `${papa.id}${conToppings ? '' : '-solas'}`
  const desc = papa.hasSauceChoice
    ? `Boneless con salsa ${sauce.label}`
    : conToppings
      ? 'Con toppings'
      : 'Solas'

  const handleAdd = () => {
    addItem({
      id: cartId,
      title: papa.name,
      description: desc,
      price: papa.basePrice,
      priceDisplay: `$${papa.basePrice}`,
      image: papa.image,
      quantity: 1,
      message: `Hola, quiero pedir ${papa.name} (${desc})`,
    })
  }

  return (
    <ProductCard
      name={papa.name}
      price={papa.basePrice}
      image={papa.image}
      badge={papa.badge}
      description={papa.description}
      ingredients={papa.ingredients}
      cartId={cartId}
      onAdd={handleAdd}
      index={index}
    >
      {/* Topping choice */}
      {papa.hasToppingChoice && (
        <div className="mt-3">
          <span className="text-xs font-medium text-text-muted">Presentación</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <button
              type="button"
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
              type="button"
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

      {/* Sauce choice */}
      {papa.hasSauceChoice && (
        <div className="mt-3">
          <span className="text-xs font-medium text-text-muted">Elegí tu salsa para los boneless</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {sauceOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
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
    </ProductCard>
  )
}

export default function Papas() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {papas.map((p, i) => (
        <PapaCard key={p.id} papa={p} index={i} />
      ))}
    </div>
  )
}
