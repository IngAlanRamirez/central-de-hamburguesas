export interface BebidaProduct {
  id: string
  name: string
  basePrice: number
  description: string
  ingredients: string[]
  image: string
  badge?: string
}

export const bebidas: BebidaProduct[] = [
  {
    id: 'fresa',
    name: 'Soda Italiana de Fresa',
    basePrice: 50,
    description: 'Agua mineral, burbusoda de fresa, fresas naturales y hielo',
    ingredients: ['Agua mineral', 'Burbusoda de fresa', 'Fresas naturales', 'Hielo'],
    image: '/menu/soda-fresa.jpg',
    badge: 'Fresa',
  },
  {
    id: 'ice',
    name: 'Soda Italiana Ice',
    basePrice: 50,
    description: 'Agua mineral, burbusoda de cereza, cerezas naturales y hielo',
    ingredients: ['Agua mineral', 'Burbusoda de cereza', 'Cerezas naturales', 'Hielo'],
    image: '/menu/soda-ice.jpg',
    badge: 'Ice',
  },
  {
    id: 'hulk',
    name: 'Soda Italiana Hulk',
    basePrice: 55,
    description: 'Agua mineral, burbusoda de manzana verde, manzana verde natural y hielo',
    ingredients: ['Agua mineral', 'Burbusoda de manzana verde', 'Manzana verde natural', 'Hielo'],
    image: '/menu/soda-hulk.jpg',
    badge: 'Hulk',
  },
]
