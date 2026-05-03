'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { bonelessProduct, sauceOptions, bonelessExtras, type SauceOption } from '@/lib/data/boneless'
import type { CartItem } from '@/lib/types/cart'

export default function Boneless() {
  const [sauce, setSauce] = useState<SauceOption>(sauceOptions[0])
  const [withFries, setWithFries] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const finalPrice = bonelessProduct.basePrice + (withFries ? 30 : 0)
  const cartId = `boneless-${sauce.id}${withFries ? '-papas' : ''}`

  const desc = `Salsa ${sauce.label}${withFries ? ' | + Papas fritas' : ''}`

  const handleAdd = () => {
    addItem({
      id: cartId,
      title: bonelessProduct.name,
      description: desc,
      price: finalPrice,
      priceDisplay: `$${finalPrice}`,
      image: bonelessProduct.image,
      quantity: 1,
      message: `Hola, quiero pedir Boneless (${desc}) = $${finalPrice}`,
    })
  }

  return (
    <div className="mx-auto max-w-md">
      <ProductCard
        name={bonelessProduct.name}
        price={finalPrice}
        image={bonelessProduct.image}
        badge={bonelessProduct.badge}
        ingredients={bonelessProduct.ingredients}
        cartId={cartId}
        onAdd={handleAdd}
      >
        {/* Sauce selector */}
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

        {/* Fries toggle */}
        <div className="mt-3">
          <span className="text-xs font-medium text-text-muted">Extra</span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {bonelessExtras.map((extra) => (
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
