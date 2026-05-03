'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { QuantityPill } from '@/components/ui/quantity-pill'
import { useCartStore } from '@/lib/store/cart'
import { useCartHydrated } from '@/lib/utils/cart-utils'
import type { CartItem } from '@/lib/types/cart'

export interface ProductCardProps {
  /** Nombre del producto */
  name: string
  /** Precio numérico */
  price: number
  /** Ruta de imagen */
  image: string
  /** Badge opcional */
  badge?: string
  /** Ingredientes para el acordeón */
  ingredients?: string[]
  /** Texto corto de descripción debajo del nombre */
  description?: string
  /** ID único para el carrito (incluye variantes) */
  cartId: string
  /** Función al agregar al carrito */
  onAdd: () => void
  /** Índice para delay de animación */
  index?: number
  /** Contenido de personalización (selectores, etc.) */
  children?: ReactNode
}

export function ProductCard({
  name,
  price,
  image,
  badge,
  ingredients,
  description,
  cartId,
  onAdd,
  index = 0,
  children,
}: ProductCardProps) {
  const hydrated = useCartHydrated()
  const items = useCartStore((s) => s.items)
  const incrementQuantity = useCartStore((s) => s.incrementQuantity)
  const decrementQuantity = useCartStore((s) => s.decrementQuantity)

  const cartItem = items.find((i) => i.id === cartId)

  return (
    <AnimateOnScroll delay={index * 100} direction="fade" className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-dark transition-all duration-300 ease-out hover:scale-[1.03] hover:border-primary hover:shadow-xl border-2 border-transparent">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {badge && (
            <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl uppercase tracking-wide text-text">
              {name}
            </h3>
            <span className="shrink-0 font-mono text-lg font-bold text-primary">
              ${price}
            </span>
          </div>

          {description && (
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {description}
            </p>
          )}

          {/* Ingredients accordion */}
          {ingredients && ingredients.length > 0 && (
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
                {ingredients.join(' · ')}
              </p>
            </details>
          )}

          {/* Customization children (meat, sauce, fruit, etc.) */}
          {children}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Add to cart */}
          <div className="mt-auto pt-4">
            {hydrated && cartItem ? (
              <QuantityPill
                quantity={cartItem.quantity}
                onIncrement={() => incrementQuantity(cartId)}
                onDecrement={() => decrementQuantity(cartId)}
                className="w-full justify-center"
              />
            ) : (
              <Button
                onClick={onAdd}
                variant="primary"
                size="sm"
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            )}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  )
}
