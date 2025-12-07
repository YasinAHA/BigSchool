import { useState } from 'react'
import type { Product } from '@shared/types'
import { formatPrice } from '@shared/utils/formatPrice'
import * as Sentry from '@sentry/react'
import DOMPurify from 'dompurify'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ✅ REFACTORED: Using formatPrice utility instead of primitive obsession
  // ✅ REFACTORED: Removed unused calculateBulkDiscount function (dead code)
  // ✅ SECURITY: Sanitize user input with DOMPurify to prevent XSS attacks
  // TODO: Extract button component to shared/components for reusability

  // 💫 Optimistic UI: Show "Added!" feedback immediately for better perceived performance
  // NOTE: Could use React 19's useOptimistic hook, but using useState to demonstrate the concept explicitly
  // Reference: https://react.dev/reference/react/useOptimistic
  const [isAdding, setIsAdding] = useState(false)

  // Sanitize product data to prevent XSS attacks
  const safeName = DOMPurify.sanitize(product.name)
  const safeDescription = DOMPurify.sanitize(product.description)

  const handleAddToCart = () => {
    // 🍞 Breadcrumb: Track user adding items to cart
    Sentry.addBreadcrumb({
      message: 'User added item to cart',
      category: 'cart.action',
      level: 'info',
      data: {
        productId: product.id,
        productName: product.name,
        price: product.price,
      },
    })

    // Optimistic UI: Show "Added!" immediately
    setIsAdding(true)
    onAddToCart(product)

    // Reset button after 1 second
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <article className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: safeName }} />
          <p className="text-sm text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: safeDescription }} />
        </div>
        <span className="text-2xl" role="img" aria-label={product.name}>
          {product.emoji}
        </span>
      </div>
      <p className="text-2xl font-bold text-indigo-600 mt-4">{formatPrice(product.price)}</p>
      <button
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to cart for ${formatPrice(product.price)}`}
        className={`w-full mt-4 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all font-medium ${
          isAdding
            ? 'bg-green-600 hover:bg-green-700 scale-105'
            : 'bg-indigo-600 hover:bg-indigo-700 scale-100'
        }`}
      >
        {isAdding ? '✓ Added!' : 'Add to Cart'}
      </button>
    </article>
  )
}
