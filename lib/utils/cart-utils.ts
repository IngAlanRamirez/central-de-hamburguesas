import { CartItem } from '@/lib/types/cart'

export function generateWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map(
    (item) =>
      `- ${item.quantity}x ${item.title} ($${item.price} c/u) = $${item.price * item.quantity}`
  )
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  return `Hola, quiero pedir:\n${lines.join('\n')}\n\nTotal: $${total}\n\n¡Gracias!`
}

export function formatPrice(price: number): string {
  return `$${price}`
}
