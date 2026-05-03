import { useEffect } from 'react'
import { CartItem } from '@/lib/types/cart'
import { useCartStore } from '@/lib/store/cart'

/**
 * Hook que indica si el store de carrito ya terminó de hidratar
 * desde localStorage. Útil para evitar errores de hidratación de React.
 *
 * Uso:
 *   const hydrated = useCartHydrated()
 *   if (!hydrated) return null // o loader
 */
export function useCartHydrated(): boolean {
  const hydrated = useCartStore((s) => s._hydrated)
  const setHydrated = useCartStore((s) => s._setHydrated)

  useEffect(() => {
    setHydrated()
  }, [setHydrated])

  return hydrated
}

export function generateWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map(
    (item) =>
      `- ${item.quantity}x ${item.title} ($${item.price} c/u) = $${item.price * item.quantity}`
  )
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  return `Hola, quiero pedir:\n${lines.join('\n')}\n\nTotal: $${total}\n\n¡Gracias!`
}


