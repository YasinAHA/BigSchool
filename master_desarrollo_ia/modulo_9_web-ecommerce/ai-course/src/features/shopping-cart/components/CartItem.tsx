import { useState } from 'react'
import type { CartItem as CartItemType } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'
import * as Sentry from '@sentry/react'

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: string) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  // ✅ REFACTORED: Removed unused validateQuantity function (dead code)
  // ✅ REFACTORED: Removed itemPrice primitive obsession, using formatPrice utility directly

  // 💫 Optimistic UI: Show removing state immediately for better perceived performance
  // NOTE: Could use React 19's useOptimistic hook, but using useState to demonstrate the concept explicitly
  // Reference: https://react.dev/reference/react/useOptimistic
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => {
    // 🍞 Breadcrumb: Track user removing items from cart
    Sentry.addBreadcrumb({
      message: 'User removed item from cart',
      category: 'cart.action',
      level: 'info',
      data: {
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
      },
    })

    // Optimistic UI: Update state immediately
    setIsRemoving(true)

    // Delay actual removal to show animation
    setTimeout(() => {
      onRemove(item.id)
    }, 300)
  }

  return (
    <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label={item.name}>
          {item.emoji}
        </span>
        <div>
          <h4 className="font-semibold text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-indigo-600">{formatPrice(item.price)}</p>
        <button
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded px-2 py-1 text-sm font-medium"
        >
          Remove Item
        </button>
      </div>
    </div>
  )
}
