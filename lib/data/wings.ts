import { SAUCE_OPTIONS } from '@/lib/constants'

export interface WingsProduct {
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

export const wingsProduct: WingsProduct = {
  id: 'wings',
  name: 'Alitas',
  basePrice: 80,
  ingredients: ['Apio', 'Pepino', 'Lechuga', 'Zanahoria'],
  image: '/menu/wings.jpg',
  badge: 'Alitas',
}

export const sauceOptions = SAUCE_OPTIONS

export const wingsExtras: ExtraOption[] = [
  { id: 'papas', label: 'Papas fritas', price: 30 },
]
