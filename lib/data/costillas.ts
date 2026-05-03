import { SAUCE_OPTIONS } from '@/lib/constants'

export interface CostillasProduct {
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

export const costillasProduct: CostillasProduct = {
  id: 'costillas',
  name: 'Costillas',
  basePrice: 90,
  ingredients: ['Apio', 'Pepino', 'Lechuga', 'Zanahoria'],
  image: '/menu/costillas.jpg',
  badge: 'Costillas',
}

export const sauceOptions = SAUCE_OPTIONS

export const costillasExtras: ExtraOption[] = [
  { id: 'papas', label: 'Papas fritas', price: 30 },
]
