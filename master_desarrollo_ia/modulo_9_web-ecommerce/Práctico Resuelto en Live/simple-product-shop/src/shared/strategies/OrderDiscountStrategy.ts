import type { CartItem } from '@/shared/types'
import type { DiscountStrategy } from './DiscountStrategy'
import { ORDER_DISCOUNT } from '@/shared/constants/businessRules'

export class OrderDiscountStrategy implements DiscountStrategy {
  name = 'Order Discount'
  description = `${ORDER_DISCOUNT.PERCENTAGE}% off on orders over $${ORDER_DISCOUNT.MIN_SUBTOTAL}`

  isApplicable(_items: CartItem[], subtotal: number): boolean {
    return subtotal >= ORDER_DISCOUNT.MIN_SUBTOTAL
  }

  calculate(_items: CartItem[], subtotal: number): number {
    return (subtotal * ORDER_DISCOUNT.PERCENTAGE) / 100
  }
}
