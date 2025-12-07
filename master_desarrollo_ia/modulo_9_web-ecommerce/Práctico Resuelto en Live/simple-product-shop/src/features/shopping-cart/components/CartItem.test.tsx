import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CartItem } from './CartItem'
import type { CartItem as CartItemType } from '@/shared/types'
import { QUANTITY_LIMITS } from '@/shared/constants/businessRules'

const mockCartItem: CartItemType = {
  product: {
    id: 1,
    name: 'Test Product',
    price: 25,
    image: 'https://example.com/image.jpg',
    description: 'A test product',
  },
  quantity: 3,
}

describe('CartItem', () => {
  it('renders product name and price', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$25.00')).toBeInTheDocument()
  })

  it('renders current quantity', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders calculated subtotal', () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
    )

    // 25 * 3 = 75
    expect(screen.getByText('$75.00')).toBeInTheDocument()
  })

  it('calls onUpdateQuantity with incremented value when + is clicked', async () => {
    const user = userEvent.setup()
    const handleUpdateQuantity = vi.fn()

    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={() => {}}
      />
    )

    await user.click(screen.getByRole('button', { name: /increase quantity/i }))

    expect(handleUpdateQuantity).toHaveBeenCalledWith(4)
  })

  it('calls onUpdateQuantity with decremented value when - is clicked', async () => {
    const user = userEvent.setup()
    const handleUpdateQuantity = vi.fn()

    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={() => {}}
      />
    )

    await user.click(screen.getByRole('button', { name: /decrease quantity/i }))

    expect(handleUpdateQuantity).toHaveBeenCalledWith(2)
  })

  it('disables decrease button when quantity is at minimum', () => {
    const itemWithMinQuantity: CartItemType = {
      ...mockCartItem,
      quantity: QUANTITY_LIMITS.MIN,
    }

    render(
      <CartItem
        item={itemWithMinQuantity}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeDisabled()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup()
    const handleRemove = vi.fn()

    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={() => {}}
        onRemove={handleRemove}
      />
    )

    await user.click(screen.getByRole('button', { name: /remove/i }))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })
})
