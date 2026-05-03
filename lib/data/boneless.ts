import { SAUCE_OPTIONS } from '@/lib/constants'

export interface BonelessProduct {
  id: string
  name: string
  basePrice: number
  ingredients: string[]
  image: string
  badge?: string
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

export const sauceOptions = SAUCE_OPTIONS

export const bonelessExtras: ExtraOption[] = [
  { id: 'papas', label: 'Papas fritas', price: 30 },
]
