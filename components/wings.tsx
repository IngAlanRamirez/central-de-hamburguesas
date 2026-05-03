'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { wingsProduct, sauceOptions, wingsExtras } from '@/lib/data/wings'
import type { CartItem } from '@/lib/types/cart'

export default function Wings() {
  const [sauce, setSauce] = useState(sauceOptions[0])
  const [withFries, setWithFries] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const finalPrice = wingsProduct.basePrice + (withFries ? 30 : 0)
  const cartId = `wings-${sauce.id}${withFries ? '-papas' : ''}`
  const desc = `Salsa ${sauce.label}${withFries ? ' | + Papas fritas' : ''}`

  const handleAdd = () => {
    addItem({
      id: cartId,
      title: wingsProduct.name,
      description: desc,
      price: finalPrice,
      priceDisplay: `$${finalPrice}`,
      image: wingsProduct.image,
      quantity: 1,
      message: `Hola, quiero pedir Alitas (${desc}) = $${finalPrice}`,
    })
  }

  return (
    <div className="mx-auto max-w-md">
      <ProductCard
        name={wingsProduct.name}
        price={finalPrice}
        image={wingsProduct.image}
        badge={wingsProduct.badge}
        ingredients={wingsProduct.ingredients}
        cartId={cartId}
        onAdd={handleAdd}
      >
        <div className="mt-3">
          <span className="text-xs font-medium text-text-muted">Elegí tu salsa</span>
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
        <div className="mt-3">
          <span className="text-xs font-medium text-text-muted">Extra</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {wingsExtras.map((extra) => (
              <button
                key={extra.id}
                type="button"
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
      </ProductCard>
    </div>
  )
}
