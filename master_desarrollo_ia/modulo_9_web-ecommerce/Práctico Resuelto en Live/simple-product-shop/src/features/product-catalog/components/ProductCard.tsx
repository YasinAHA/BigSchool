import { useState } from 'react'
import type { Product } from '@/shared/types'
import { formatPrice } from '@/shared/utils'
import { UI_TEXT } from '@/shared/constants/ui'

type ButtonState = 'idle' | 'loading' | 'success' | 'error'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const BUTTON_CONFIG: Record<ButtonState, { text: string; className: string; icon?: string }> = {
  idle: {
    text: UI_TEXT.ADD_TO_CART,
    className: 'bg-blue-600 text-white hover:bg-blue-700',
  },
  loading: {
    text: UI_TEXT.ADDING,
    className: 'bg-gray-400 text-white cursor-wait',
  },
  success: {
    text: UI_TEXT.ADDED,
    className: 'bg-green-600 text-white',
    icon: '✓',
  },
  error: {
    text: UI_TEXT.FAILED,
    className: 'bg-red-600 text-white hover:bg-red-700',
    icon: '✕',
  },
}

function getAriaLabel(state: ButtonState, productName: string): string {
  switch (state) {
    case 'loading':
      return `Adding ${productName} to cart`
    case 'success':
      return `${productName} added to cart`
    case 'error':
      return `Failed to add ${productName} to cart. Click to retry`
    default:
      return `Add ${productName} to cart`
  }
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [buttonState, setButtonState] = useState<ButtonState>('idle')

  const handleAddToCart = async () => {
    if (buttonState === 'loading') return

    setButtonState('loading')

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 300))
      onAddToCart(product)
      setButtonState('success')
      setTimeout(() => setButtonState('idle'), 2000)
    } catch {
      setButtonState('error')
      setTimeout(() => setButtonState('idle'), 3000)
    }
  }

  const config = BUTTON_CONFIG[buttonState]

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className="rounded-lg border bg-white p-4 shadow-md hover:shadow-lg transition-shadow"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md"
      />
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
      <p className="text-gray-600 mt-2">{formatPrice(product.price)}</p>
      <button
        onClick={handleAddToCart}
        disabled={buttonState === 'loading'}
        aria-label={getAriaLabel(buttonState, product.name)}
        className={`mt-4 w-full rounded-md px-4 py-2 transition-colors flex items-center justify-center gap-2 ${config.className}`}
      >
        {buttonState === 'loading' && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {config.icon && buttonState !== 'loading' && <span>{config.icon}</span>}
        {config.text}
      </button>
    </div>
  )
}
