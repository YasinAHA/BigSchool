import { useCart } from '@/context/useCart'
import { formatPrice } from '@/shared/utils'
import { CartItem, CartSummary } from './components'
import { UI_TEXT } from '@/shared/constants/ui'

export function ShoppingCart() {
  const { items, itemCount, subtotal, discount, total, discountBreakdown, updateQuantity, removeItem } = useCart()

  const getCartSummaryText = () => {
    if (itemCount === 0) return 'Your cart is empty'
    const itemWord = itemCount === 1 ? 'item' : 'items'
    return `Cart updated: ${itemCount} ${itemWord}, total ${formatPrice(total)}`
  }

  return (
    <section>
      {/* Aria-live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {getCartSummaryText()}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        {itemCount > 0 && (
          <span className="bg-blue-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full">
            {itemCount}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-6xl mb-4" aria-hidden="true">🛒</div>
          <p className="text-gray-500 text-lg">{UI_TEXT.EMPTY_CART}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={(quantity) =>
                  updateQuantity(item.product.id, quantity)
                }
                onRemove={() => removeItem(item.product.id)}
              />
            ))}
          </div>
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            total={total}
            itemCount={itemCount}
            discountBreakdown={discountBreakdown}
          />
        </div>
      )}
    </section>
  )
}
