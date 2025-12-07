import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ProductCard } from './ProductCard'

const PRODUCT_NAME = 'Test Product'

const mockProduct = {
  id: 1,
  name: PRODUCT_NAME,
  price: 29.99,
  image: 'https://example.com/image.jpg',
  description: 'A great product for testing purposes.',
}

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    expect(screen.getByText(PRODUCT_NAME)).toBeInTheDocument()
  })

  it('renders formatted price', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('renders product image', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    const image = screen.getByRole('img', { name: PRODUCT_NAME })
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('calls onAddToCart with product when button is clicked', async () => {
    const user = userEvent.setup()
    const handleAddToCart = vi.fn()

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />)

    await user.click(screen.getByRole('button', { name: /add.*to cart/i }))

    await waitFor(() => {
      expect(handleAddToCart).toHaveBeenCalledTimes(1)
    })
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('shows loading state when clicking add to cart', async () => {
    const user = userEvent.setup()

    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    await user.click(screen.getByRole('button', { name: /add.*to cart/i }))

    expect(screen.getByRole('button', { name: /adding.*to cart/i })).toBeInTheDocument()
    expect(screen.getByText('Adding...')).toBeInTheDocument()
  })

  it('shows success feedback after adding to cart', async () => {
    const user = userEvent.setup()

    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    await user.click(screen.getByRole('button', { name: /add.*to cart/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /added to cart/i })).toBeInTheDocument()
    })
    expect(screen.getByText('Added!')).toBeInTheDocument()
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('disables button during loading state', async () => {
    const user = userEvent.setup()

    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />)

    await user.click(screen.getByRole('button', { name: /add.*to cart/i }))

    expect(screen.getByRole('button')).toBeDisabled()
  })
})
