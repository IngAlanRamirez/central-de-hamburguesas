'use client'

import Image from 'next/image'
import { QuantityPill } from '@/components/ui/quantity-pill'
import { CartItem as CartItemType } from '@/lib/types/cart'
import { useCartStore } from '@/lib/store/cart'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const incrementQuantity = useCartStore((state) => state.incrementQuantity)
  const decrementQuantity = useCartStore((state) => state.decrementQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  
  const subtotal = item.price * item.quantity
  
  return (
    <div className="flex gap-4 border-b border-cream-dark pb-4 last:border-0">
      {/* Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-display text-lg uppercase text-text">{item.title}</h3>
          <p className="text-sm text-text-muted">{item.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <QuantityPill
            quantity={item.quantity}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
          />
          
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-bold text-primary">
              ${subtotal}
            </span>
            
            <button
              onClick={() => removeItem(item.id)}
              className="text-xs text-text-muted transition-colors hover:text-error"
              aria-label="Eliminar item"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
