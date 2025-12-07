import { describe, it, expect } from 'vitest'
import { OrderDiscountStrategy } from './OrderDiscountStrategy'
import { ORDER_DISCOUNT } from '@/shared/constants/businessRules'
import type { CartItem } from '@/shared/types'

const createCartItem = (price: number, quantity: number): CartItem => ({
  product: {
    id: 1,
    name: 'Test Product',
    price,
    image: 'test.jpg',
    description: 'Test description',
  },
  quantity,
})

describe('OrderDiscountStrategy', () => {
  const strategy = new OrderDiscountStrategy()

  it('has the correct name', () => {
    expect(strategy.name).toBe('Order Discount')
  })

  it('is not applicable when subtotal is below minimum', () => {
    const items = [createCartItem(10, 5)]

    expect(strategy.isApplicable(items, ORDER_DISCOUNT.MIN_SUBTOTAL - 1)).toBe(false)
  })

  it('is applicable when subtotal equals minimum', () => {
    const items = [createCartItem(100, 1)]

    expect(strategy.isApplicable(items, ORDER_DISCOUNT.MIN_SUBTOTAL)).toBe(true)
  })

  it('is applicable when subtotal exceeds minimum', () => {
    const items = [createCartItem(150, 1)]

    expect(strategy.isApplicable(items, 150)).toBe(true)
  })

  it('calculates 15% discount correctly', () => {
    const items = [createCartItem(100, 1)]
    // 15% of 100 = 15

    expect(strategy.calculate(items, 100)).toBe(15)
  })

  it('calculates discount on larger amounts', () => {
    const items = [createCartItem(200, 1)]
    // 15% of 200 = 30

    expect(strategy.calculate(items, 200)).toBe(30)
  })
})
