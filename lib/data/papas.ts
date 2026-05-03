export interface PapaProduct {
  id: string
  name: string
  basePrice: number
  description: string
  ingredients: string[]
  image: string
  badge?: string
  hasToppingChoice?: boolean
  hasSauceChoice?: boolean
}

export const papas: PapaProduct[] = [
  {
    id: 'francesas',
    name: 'Papas Francesas',
    basePrice: 40,
    description: 'Papas onduladas con crema, queso amarillo, catsup y salsa picante',
    ingredients: ['Papas onduladas', 'Crema', 'Queso amarillo', 'Catsup', 'Salsa picante'],
    image: '/menu/papas-francesas.jpg',
    badge: 'Francesas',
    hasToppingChoice: true,
  },
  {
    id: 'gajo',
    name: 'Papas Gajo',
    basePrice: 60,
    description: 'Papas de gajo condimentadas',
    ingredients: ['Papas de gajo condimentadas'],
    image: '/menu/papas-gajo.jpg',
    badge: 'Gajo',
    hasToppingChoice: true,
  },
  {
    id: 'central',
    name: 'Papas Central',
    basePrice: 65,
    description: 'Papas en gajo condimentadas con boneless',
    ingredients: ['Papas de gajo condimentadas', 'Boneless'],
    image: '/menu/papas-central.jpg',
    badge: 'Central',
    hasSauceChoice: true,
  },
]
