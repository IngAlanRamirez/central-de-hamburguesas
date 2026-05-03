export interface BonelessProduct {
  id: string
  name: string
  basePrice: number
  ingredients: string[]
  image: string
  badge?: string
}

export interface SauceOption {
  id: string
  label: string
}

export interface ExtraOption {
  id: string
  label: string
  price: number
}

export const bonelessProduct: BonelessProduct = {
  id: 'boneless',
  name: 'Boneless',
  basePrice: 75,
  ingredients: ['Apio', 'Pepino', 'Lechuga', 'Zanahoria'],
  image: '/menu/boneless.jpg',
  badge: 'Boneless',
}

export const sauceOptions: SauceOption[] = [
  { id: 'bbq', label: 'BBQ' },
  { id: 'lemon-pepper', label: 'Lemon Pepper' },
  { id: 'morita-blueberry', label: 'Morita Blueberry' },
  { id: 'honey', label: 'Honey' },
  { id: 'habanero-mango', label: 'Habanero Mango' },
  { id: 'habanero-pina', label: 'Habanero Piña' },
  { id: 'central', label: 'Salsa Central' },
]

export const bonelessExtras: ExtraOption[] = [
  { id: 'papas', label: 'Papas fritas', price: 30 },
]
