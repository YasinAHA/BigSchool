import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { CartProvider } from './CartContext'
import { useCart } from './useCart'
import type { Product } from '@/shared/types'
import type { ReactNode } from 'react'

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 25,
  image: 'test.jpg',
  description: 'Test description',
}

const mockProduct2: Product = {
  id: 2,
  name: 'Another Product',
  price: 50,
  image: 'test2.jpg',
  description: 'Another description',
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toEqual([])
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
    expect(result.current.discount).toBe(0)
    expect(result.current.total).toBe(0)
  })

  it('addItem adds new product with quantity 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product).toEqual(mockProduct)
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('addItem increments quantity if product already exists', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
      result.current.addItem(mockProduct)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('updateQuantity changes item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
    })

    act(() => {
      result.current.updateQuantity(mockProduct.id, 5)
    })

    expect(result.current.items[0].quantity).toBe(5)
  })

  it('updateQuantity with 0 removes the item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
    })

    act(() => {
      result.current.updateQuantity(mockProduct.id, 0)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('removeItem removes an item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
      result.current.addItem(mockProduct2)
    })

    act(() => {
      result.current.removeItem(mockProduct.id)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product.id).toBe(mockProduct2.id)
  })

  it('clearCart empties the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
      result.current.addItem(mockProduct2)
    })

    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemCount).toBe(0)
  })

  it('itemCount sums all quantities', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
      result.current.addItem(mockProduct)
      result.current.addItem(mockProduct2)
    })

    expect(result.current.itemCount).toBe(3)
  })

  it('subtotal calculates correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct) // 25
      result.current.addItem(mockProduct) // 25 (now 2 × 25 = 50)
      result.current.addItem(mockProduct2) // 50
    })

    // (25 × 2) + (50 × 1) = 100
    expect(result.current.subtotal).toBe(100)
  })

  it('loads cart from localStorage on init', () => {
    const savedCart = [
      { product: mockProduct, quantity: 3 },
    ]
    localStorage.setItem('cart', JSON.stringify(savedCart))

    const { result } = renderHook(() => useCart(), { wrapper })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(3)
  })

  it('calculates discount when bulk threshold is met', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
      result.current.updateQuantity(mockProduct.id, 5)
    })

    // 25 * 5 = 125, bulk discount 10% = 12.5
    // Order discount 15% of (125 - 12.5) = 15% of 112.5 = 16.875
    // Total discount = 29.375
    expect(result.current.subtotal).toBe(125)
    expect(result.current.discount).toBeCloseTo(29.375)
    expect(result.current.total).toBeCloseTo(95.625)
  })

  it('provides discount breakdown', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addItem(mockProduct)
      result.current.updateQuantity(mockProduct.id, 5)
    })

    expect(result.current.discountBreakdown).toHaveLength(2)
    expect(result.current.discountBreakdown[0].name).toBe('Bulk Discount')
    expect(result.current.discountBreakdown[1].name).toBe('Order Discount')
  })
})
