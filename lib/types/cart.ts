export interface CartItem {
  id: string           // slug: "combo-clasico"
  title: string        // "Combo Clásico"
  description: string  // "Hamburguesa + Papas"
  price: number        // 100 (numeric, para cálculos)
  priceDisplay: string // "$100" (para UI)
  image: string        // "/menu/combos/combo-clasico.webp"
  quantity: number     // 1, 2, 3...
  message: string      // "Hola, quiero pedir el Combo Clásico"
}

export interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
  clearCart: () => void
  
  // UI Actions
  openCart: () => void
  closeCart: () => void
  
  // Computed
  totalItems: () => number
  totalPrice: () => number

  // Hydration
  _hydrated: boolean
  _setHydrated: () => void
}
