'use client'

import { ProductCard } from '@/components/ui/product-card'
import { useCartStore } from '@/lib/store/cart'
import { hotDogs, type HotDogProduct } from '@/lib/data/hot-dogs'
import type { CartItem } from '@/lib/types/cart'

function HotDogCard({ hotDog, index }: { hotDog: HotDogProduct; index: number }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem({
      id: hotDog.id,
      title: hotDog.name,
      description: hotDog.description,
      price: hotDog.basePrice,
      priceDisplay: `$${hotDog.basePrice}`,
      image: hotDog.image,
      quantity: 1,
      message: `Hola, quiero pedir ${hotDog.name}`,
    })
  }

  return (
    <ProductCard
      name={hotDog.name}
      price={hotDog.basePrice}
      image={hotDog.image}
      badge={hotDog.badge}
      ingredients={hotDog.ingredients}
      description={hotDog.description}
      cartId={hotDog.id}
      onAdd={handleAdd}
      index={index}
    />
  )
}

export default function HotDogs() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hotDogs.map((h, i) => (
        <HotDogCard key={h.id} hotDog={h} index={i} />
      ))}
    </div>
  )
}
