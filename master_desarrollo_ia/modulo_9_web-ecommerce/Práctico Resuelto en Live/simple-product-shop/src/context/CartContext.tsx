import { useReducer, useEffect, useRef, useMemo, type ReactNode } from 'react'
import * as Sentry from '@sentry/react'
import type { Product, CartItem } from '@/shared/types'
import { DiscountCalculator } from '@/shared/strategies/DiscountCalculator'
import { BulkDiscountStrategy } from '@/shared/strategies/BulkDiscountStrategy'
import { OrderDiscountStrategy } from '@/shared/strategies/OrderDiscountStrategy'
import { CartContext } from './CartContextValue'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }

const STORAGE_KEY = 'cart'

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.id
      )

      if (existingIndex >= 0) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        }
        return { items: newItems }
      }

      return {
        items: [...state.items, { product: action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.product.id !== action.payload),
      }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => item.product.id !== action.payload.productId
          ),
        }
      }

      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }

    case 'CLEAR_CART':
      return { items: [] }

    default:
      return state
  }
}

function loadInitialState(): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { items: JSON.parse(saved) }
    }
  } catch {
    // Invalid JSON, start fresh
  }
  return { items: [] }
}

const discountCalculator = new DiscountCalculator([
  new BulkDiscountStrategy(),
  new OrderDiscountStrategy(),
])

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadInitialState)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const { discount, discountBreakdown, total } = useMemo(() => {
    const discount = discountCalculator.calculate(state.items, subtotal)
    const discountBreakdown = discountCalculator.getBreakdown(state.items, subtotal)
    const total = subtotal - discount
    return { discount, discountBreakdown, total }
  }, [state.items, subtotal])

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Added ${product.name} to cart`,
      level: 'info',
      data: { productId: product.id, productName: product.name, price: product.price },
    })
  }

  const removeItem = (productId: number) => {
    const product = state.items.find((item) => item.product.id === productId)?.product
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Removed ${product?.name || 'item'} from cart`,
      level: 'info',
      data: { productId },
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Updated quantity to ${quantity}`,
      level: 'info',
      data: { productId, quantity },
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    Sentry.addBreadcrumb({
      category: 'cart',
      message: 'Cleared cart',
      level: 'info',
    })
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        discount,
        total,
        discountBreakdown,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
