export interface HotDogProduct {
  id: string
  name: string
  basePrice: number
  ingredients: string[]
  image: string
  badge?: string
  description: string
}

export const hotDogs: HotDogProduct[] = [
  {
    id: 'clasico',
    name: 'Hot Dog Clásico',
    basePrice: 45,
    ingredients: [
      'Pan jumbo',
      'Salchicha jumbo',
      'Catsup',
      'Mayonesa',
      'Mostaza',
      'Jitomate',
      'Cebolla',
      'Picante',
    ],
    image: '/menu/hotdog-clasico.jpg',
    badge: 'Clásico',
    description: 'Los ingredientes clásicos de siempre',
  },
  {
    id: 'especial',
    name: 'Hot Dog Especial',
    basePrice: 55,
    ingredients: [
      'Pan jumbo',
      'Salchicha jumbo',
      'Catsup',
      'Mayonesa',
      'Mostaza',
      'Jitomate',
      'Cebolla',
      'Picante',
      'Tocino',
      'Queso Manchego',
    ],
    image: '/menu/hotdog-especial.jpg',
    badge: 'Especial',
    description: 'Con tocino y queso manchego',
  },
  {
    id: 'central',
    name: 'Hot Dog Central',
    basePrice: 60,
    ingredients: [
      'Pan jumbo',
      'Salchicha jumbo',
      'Catsup',
      'Mayonesa',
      'Mostaza',
      'Jitomate',
      'Cebolla caramelizada',
      'Picante',
      'Tocino',
      'Queso Manchego',
    ],
    image: '/menu/hotdog-central.jpg',
    badge: 'Central',
    description: 'Cebolla caramelizada, tocino y queso manchego',
  },
  {
    id: 'momia',
    name: 'Hot Dog Momia',
    basePrice: 80,
    ingredients: [
      'Pan jumbo',
      'Salchicha jumbo envuelta en carne de hamburguesa',
      'Catsup',
      'Mayonesa',
      'Mostaza',
      'Jitomate',
      'Cebolla caramelizada',
      'Picante',
      'Queso Manchego',
    ],
    image: '/menu/hotdog-momia.jpg',
    badge: 'Momia',
    description: 'Salchicha envuelta en carne, cebolla caramelizada y queso manchego',
  },
]
