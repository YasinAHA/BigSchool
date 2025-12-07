import type { CartItem as CartItemType } from '@/shared/types'
import { formatPrice } from '@/shared/utils'
import { QUANTITY_LIMITS } from '@/shared/constants/businessRules'
import { UI_TEXT } from '@/shared/constants/ui'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item
  const subtotal = product.price * quantity

  return (
    <div data-testid={`cart-item-${product.id}`} className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm">{formatPrice(product.price)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(quantity - 1)}
            disabled={quantity === QUANTITY_LIMITS.MIN}
            aria-label={`Decrease quantity of ${product.name}`}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span data-testid="item-quantity" aria-label={`Quantity: ${quantity}`} className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(quantity + 1)}
            aria-label={`Increase quantity of ${product.name}`}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <div className="font-semibold">
          {formatPrice(subtotal)}
        </div>

        <button
          onClick={onRemove}
          aria-label={`Remove ${product.name} from cart`}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          {UI_TEXT.REMOVE}
        </button>
      </div>
    </div>
  )
}
