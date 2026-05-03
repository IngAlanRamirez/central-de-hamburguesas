'use client'

import { useCartStore } from '@/lib/store/cart'
import { useCartHydrated } from '@/lib/utils/cart-utils'
import { QuantityPill } from '@/components/ui/quantity-pill'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { ShoppingCart } from 'lucide-react'
import type { CartItem } from '@/lib/types/cart'

const combos = [
  {
    id: 'combo-clasico',
    title: 'Combo Clásico',
    description: 'Hamburguesa + Papas',
    price: '$100',
    priceNumeric: 100,
    image: '/menu/combos/combo-clasico.webp',
    badge: 'Popular',
    message: 'Hola, quiero pedir el Combo Clásico',
  },
  {
    id: 'combo-rapido',
    title: 'Combo Rápido',
    description: 'Hot Dog + Papas',
    price: '$80',
    priceNumeric: 80,
    image: '/menu/combos/combo-rapido.webp',
    message: 'Hola, quiero pedir el Combo Rápido',
  },
  {
    id: 'combo-crunch',
    title: 'Combo Crunch',
    description: 'Boneless + Papas',
    price: '$105',
    priceNumeric: 105,
    image: '/menu/combos/combo-crunch.webp',
    message: 'Hola, quiero pedir el Combo Crunch',
  },
  {
    id: 'combo-wings',
    title: 'Combo Wings',
    description: 'Alitas + Papas',
    price: '$110',
    priceNumeric: 110,
    image: '/menu/combos/combo-wings.webp',
    message: 'Hola, quiero pedir el Combo Wings',
  },
  {
    id: 'combo-power',
    title: 'Combo Power',
    description: 'Hamburguesa + Boneless',
    price: '$135',
    priceNumeric: 135,
    image: '/menu/combos/combo-power.webp',
    message: 'Hola, quiero pedir el Combo Power',
  },
  {
    id: 'combo-mix',
    title: 'Combo Mix',
    description: 'Hot Dog + Boneless',
    price: '$110',
    priceNumeric: 110,
    image: '/menu/combos/combo-mix.webp',
    message: 'Hola, quiero pedir el Combo Mix',
  },
  {
    id: 'combo-antojo-dulce',
    title: 'Combo Antojo Dulce',
    description: 'Plátanos fritos + Papas',
    price: '$80',
    priceNumeric: 80,
    image: '/menu/combos/combo-antojo-dulce.webp',
    message: 'Hola, quiero pedir el Combo Antojo Dulce',
  },
]

export default function Combos() {
  const hydrated = useCartHydrated()
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const incrementQuantity = useCartStore((state) => state.incrementQuantity)
  const decrementQuantity = useCartStore((state) => state.decrementQuantity)
  const openCart = useCartStore((state) => state.openCart)

  const getCartItem = (id: string) => items.find((item) => item.id === id)

  const handleAddToCart = (combo: (typeof combos)[0]) => {
    const cartItem: CartItem = {
      id: combo.id,
      title: combo.title,
      description: combo.description,
      price: combo.priceNumeric,
      priceDisplay: combo.price,
      image: combo.image,
      quantity: 1,
      message: combo.message,
    }

    addItem(cartItem)
  }

  return (
    <Section id="combos" title="Nuestros Combos" subtitle="Los favoritos de la central">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {combos.map((combo, index) => {
          const cartItem = getCartItem(combo.id)

          return (
            <AnimateOnScroll key={combo.id} delay={index * 150}>
              <Card
                variant="combo"
                title={combo.title}
                description={combo.description}
                price={combo.price}
                image={combo.image}
                badge={combo.badge}
              >
                {hydrated && cartItem ? (
                  <QuantityPill
                    quantity={cartItem.quantity}
                    onIncrement={() => incrementQuantity(combo.id)}
                    onDecrement={() => decrementQuantity(combo.id)}
                    className="mt-4 w-full justify-center"
                  />
                ) : (
                  <Button
                    onClick={() => handleAddToCart(combo)}
                    variant="primary"
                    size="sm"
                    className="mt-4 w-full"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Pedir
                  </Button>
                )}
              </Card>
            </AnimateOnScroll>
          )
        })}
      </div>
    </Section>
  )
}
