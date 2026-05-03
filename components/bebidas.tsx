'use client'

import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { bebidas, type BebidaProduct } from '@/lib/data/bebidas'
import type { CartItem } from '@/lib/types/cart'

function BebidaCard({ bebida, index }: { bebida: BebidaProduct; index: number }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem({
      id: bebida.id,
      title: bebida.name,
      description: bebida.description,
      price: bebida.basePrice,
      priceDisplay: `$${bebida.basePrice}`,
      image: bebida.image,
      quantity: 1,
      message: `Hola, quiero pedir ${bebida.name}`,
    })
  }

  return (
    <ProductCard
      name={bebida.name}
      price={bebida.basePrice}
      image={bebida.image}
      badge={bebida.badge}
      ingredients={bebida.ingredients}
      description={bebida.description}
      cartId={bebida.id}
      onAdd={handleAdd}
      index={index}
    />
  )
}

export default function Bebidas() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bebidas.map((b, i) => (
        <BebidaCard key={b.id} bebida={b} index={i} />
      ))}
    </div>
  )
}
