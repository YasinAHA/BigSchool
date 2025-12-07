import { formatPrice } from '@/shared/utils'
import { ORDER_DISCOUNT } from '@/shared/constants/businessRules'
import { UI_TEXT } from '@/shared/constants/ui'

interface DiscountBreakdown {
  name: string
  amount: number
}

interface CartSummaryProps {
  subtotal: number
  discount: number
  total: number
  itemCount: number
  discountBreakdown?: DiscountBreakdown[]
}

export function CartSummary({ subtotal, discount, total, discountBreakdown = [] }: CartSummaryProps) {
  const hasOrderDiscount = discountBreakdown.some((d) => d.name === 'Order Discount')
  const showPromo = subtotal > 0 && subtotal < ORDER_DISCOUNT.MIN_SUBTOTAL && !hasOrderDiscount
  const amountNeeded = ORDER_DISCOUNT.MIN_SUBTOTAL - subtotal

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span data-testid="cart-subtotal">{formatPrice(subtotal)}</span>
        </div>

        {discountBreakdown.length > 0 && discountBreakdown.map((item) => (
          <div key={item.name} className="flex justify-between text-green-600 text-sm">
            <span>{item.name}</span>
            <span>-{formatPrice(item.amount)}</span>
          </div>
        ))}

        {discount > 0 && discountBreakdown.length === 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span data-testid="cart-total">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {showPromo && (
        <p className="mt-4 text-sm text-orange-600 font-medium">
          Add ${amountNeeded.toFixed(2)} more for 15% off!
        </p>
      )}

      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        {UI_TEXT.CHECKOUT}
      </button>
    </div>
  )
}
