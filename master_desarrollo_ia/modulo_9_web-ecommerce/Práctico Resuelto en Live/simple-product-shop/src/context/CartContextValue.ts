import { createContext } from 'react'
import type { Product, CartItem } from '@/shared/types'

export interface DiscountBreakdown {
  name: string
  amount: number
}

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  discount: number
  total: number
  discountBreakdown: DiscountBreakdown[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
