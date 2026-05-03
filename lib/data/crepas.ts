export interface CrepaProduct {
  id: string
  name: string
  basePrice: number
  description: string
  ingredients: string[]
  image: string
  badge?: string
  fruitOptions?: { id: string; label: string }[]
}

export const crepas: CrepaProduct[] = [
  {
    id: 'clasica',
    name: 'Crepa Clásica',
    basePrice: 85,
    description: 'Fresa o Plátano con Queso Philadelphia',
    ingredients: ['Queso Philadelphia'],
    image: '/menu/crepa-clasica.jpg',
    badge: 'Clásica',
    fruitOptions: [
      { id: 'fresa', label: 'Fresa' },
      { id: 'platano', label: 'Plátano' },
    ],
  },
  {
    id: 'dulce-tentacion',
    name: 'Dulce Tentación',
    basePrice: 75,
    description: 'Fresa, Zarzamora o Piña con Queso Philadelphia',
    ingredients: ['Queso Philadelphia'],
    image: '/menu/crepa-dulce-tentacion.jpg',
    badge: 'Dulce',
    fruitOptions: [
      { id: 'fresa', label: 'Fresa' },
      { id: 'zarzamora', label: 'Zarzamora' },
      { id: 'pina', label: 'Piña' },
    ],
  },
  {
    id: 'dubai',
    name: 'Crepa Dubai',
    basePrice: 95,
    description: 'Fresa, crema de pistache, kataifi y chocolate',
    ingredients: ['Fresa', 'Crema de pistache', 'Kataifi', 'Chocolate'],
    image: '/menu/crepa-dubai.jpg',
    badge: 'Dubai',
  },
  {
    id: 'central',
    name: 'Crepa Central',
    basePrice: 95,
    description: 'Fresa natural, plátano y nutella',
    ingredients: ['Fresa natural', 'Plátano', 'Nutella'],
    image: '/menu/crepa-central.jpg',
    badge: 'Central',
  },
  {
    id: 'bubulubu',
    name: 'Crepa Bubulubu',
    basePrice: 95,
    description: 'Fresa natural, Queso Philadelphia, nutella y Bubulubu',
    ingredients: ['Fresa natural', 'Queso Philadelphia', 'Nutella', 'Bubulubu en trozo'],
    image: '/menu/crepa-bubulubu.jpg',
    badge: 'Bubulubu',
  },
]
