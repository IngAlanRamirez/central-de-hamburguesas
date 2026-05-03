export type MeatType = 'Sirloin' | 'Arrachera' | 'Pollo'

export interface BurgerExtraGroup {
  id: string
  label: string
  options: { id: string; label: string }[]
  maxSelect: number
}

export interface BurgerProduct {
  id: string
  name: string
  basePrice: number
  ingredients: string[]
  meatOptions: MeatType[]
  image: string
  badge?: string
  isDoubleMeat?: boolean
  dressing?: string
  extraGroups?: BurgerExtraGroup[]
}

export const burgers: BurgerProduct[] = [
  {
    id: 'clasica',
    name: 'Hamburguesa Clásica',
    basePrice: 70,
    ingredients: [
      'Lechuga',
      'Jitomate',
      'Cebolla',
      'Picante',
      'Catsup',
      'Mostaza',
      'Mezcla de Quesos',
    ],
    meatOptions: ['Sirloin', 'Arrachera', 'Pollo'],
    image: '/menu/clasica.jpg',
    badge: 'Clásica',
  },
  {
    id: 'big-mac',
    name: 'Big Mac',
    basePrice: 95,
    ingredients: [
      'Lechuga',
      'Jitomate',
      'Cebolla',
      'Picante',
      'Catsup',
      'Mostaza',
      'Mezcla de Quesos',
    ],
    meatOptions: ['Sirloin', 'Arrachera', 'Pollo'],
    image: '/menu/big-mac.jpg',
    badge: 'Doble Carne',
    isDoubleMeat: true,
    dressing: 'Aderezo Big Mac',
  },
  {
    id: 'hawaiana',
    name: 'Hamburguesa Hawaiana',
    basePrice: 85,
    ingredients: [
      'Lechuga',
      'Jitomate',
      'Cebolla',
      'Picante',
      'Catsup',
      'Mostaza',
      'Mezcla de Quesos',
    ],
    meatOptions: ['Sirloin', 'Arrachera', 'Pollo'],
    image: '/menu/hawaiana.jpg',
    badge: 'Hawaiana',
    extraGroups: [
      {
        id: 'fruit',
        label: 'Elegí fruta',
        options: [
          { id: 'pina', label: 'Piña' },
          { id: 'cerezas', label: 'Cerezas' },
        ],
        maxSelect: 1,
      },
      {
        id: 'extra',
        label: 'Elegí extra',
        options: [
          { id: 'tocino', label: 'Tocino' },
          { id: 'jamon', label: 'Jamón' },
        ],
        maxSelect: 1,
      },
    ],
  },
  {
    id: 'doble',
    name: 'Hamburguesa Doble',
    basePrice: 90,
    ingredients: [
      'Lechuga',
      'Jitomate',
      'Cebolla',
      'Picante',
      'Catsup',
      'Mostaza',
      'Mezcla de Quesos',
    ],
    meatOptions: ['Sirloin', 'Arrachera', 'Pollo'],
    image: '/menu/doble.jpg',
    badge: 'Doble Carne',
    isDoubleMeat: true,
  },
]

export function generateBurgerDescription(
  burger: BurgerProduct,
  meat: MeatType,
  selections: Record<string, string[]>
): string {
  const parts: string[] = [`Carne: ${meat}`]

  if (burger.extraGroups) {
    for (const group of burger.extraGroups) {
      const selected = selections[group.id]
      if (selected && selected.length > 0) {
        parts.push(`${group.label}: ${selected.join(', ')}`)
      }
    }
  }

  return parts.join(' | ')
}

export function generateBurgerWhatsAppMessage(
  burger: BurgerProduct,
  meat: MeatType,
  selections: Record<string, string[]>,
  quantity: number
): string {
  const details = generateBurgerDescription(burger, meat, selections)
  const total = burger.basePrice * quantity
  return `Hola, quiero pedir ${quantity}x ${burger.name} (${details}) = $${total}`
}
