export interface PlatanoProduct {
  id: string
  name: string
  basePrice: number
  description: string
  ingredients: string[]
  image: string
  badge?: string
  mermeladaOptions?: { id: string; label: string }[]
}

export const platanos: PlatanoProduct[] = [
  {
    id: 'clasicos',
    name: 'Plátanos Clásicos',
    basePrice: 45,
    description: 'Fritos con lechera, crema, mermelada y chispas de chocolate',
    ingredients: ['Plátano frito', 'Lechera', 'Crema', 'Chispas de chocolate'],
    image: '/menu/platanos-clasicos.jpg',
    badge: 'Clásicos',
    mermeladaOptions: [
      { id: 'fresa', label: 'Mermelada de Fresa' },
      { id: 'zarzamora', label: 'Mermelada de Zarzamora' },
      { id: 'pina', label: 'Mermelada de Piña' },
    ],
  },
  {
    id: 'arabes',
    name: 'Plátanos Árabes',
    basePrice: 55,
    description: 'Capeados con lechera, crema, mermelada y chispas de chocolate',
    ingredients: ['Plátano capeado', 'Lechera', 'Crema', 'Chispas de chocolate'],
    image: '/menu/platanos-arabes.jpg',
    badge: 'Árabes',
    mermeladaOptions: [
      { id: 'fresa', label: 'Mermelada de Fresa' },
      { id: 'zarzamora', label: 'Mermelada de Zarzamora' },
      { id: 'pina', label: 'Mermelada de Piña' },
    ],
  },
  {
    id: 'especiales',
    name: 'Plátanos Especiales',
    basePrice: 65,
    description: 'Capeados con lechera, fresa natural y nutella',
    ingredients: ['Plátano capeado', 'Lechera', 'Fresa natural', 'Nutella'],
    image: '/menu/platanos-especiales.jpg',
    badge: 'Especiales',
  },
]
