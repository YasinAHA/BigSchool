import type { CartItem } from '@/shared/types'
import type { DiscountStrategy } from './DiscountStrategy'
import { BULK_DISCOUNT } from '@/shared/constants/businessRules'

export class BulkDiscountStrategy implements DiscountStrategy {
  name = 'Bulk Discount'
  description = `${BULK_DISCOUNT.PERCENTAGE}% off when you buy ${BULK_DISCOUNT.MIN_QUANTITY}+ of the same item`

  isApplicable(items: CartItem[]): boolean {
    return items.some((item) => item.quantity >= BULK_DISCOUNT.MIN_QUANTITY)
  }

  calculate(items: CartItem[]): number {
    return items.reduce((discount, item) => {
      if (item.quantity >= BULK_DISCOUNT.MIN_QUANTITY) {
        const itemSubtotal = item.product.price * item.quantity
        return discount + (itemSubtotal * BULK_DISCOUNT.PERCENTAGE) / 100
      }
      return discount
    }, 0)
  }
}
