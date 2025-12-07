import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  describe('rendering', () => {
    it('renders with pulse animation', () => {
      render(<Skeleton />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveClass('animate-pulse')
    })

    it('has role="status" for accessibility', () => {
      render(<Skeleton />)

      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has aria-label for screen readers', () => {
      render(<Skeleton />)

      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading...')
    })
  })

  describe('variants', () => {
    it('applies text variant styles by default', () => {
      render(<Skeleton variant="text" />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveClass('h-4')
      expect(skeleton).toHaveClass('rounded')
    })

    it('applies rectangular variant styles', () => {
      render(<Skeleton variant="rectangular" />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveClass('rounded-md')
    })

    it('applies circular variant with full border-radius', () => {
      render(<Skeleton variant="circular" />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveClass('rounded-full')
    })
  })

  describe('custom dimensions', () => {
    it('accepts custom width', () => {
      render(<Skeleton width={200} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveStyle({ width: '200px' })
    })

    it('accepts custom height', () => {
      render(<Skeleton height={100} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveStyle({ height: '100px' })
    })

    it('accepts both width and height', () => {
      render(<Skeleton width={150} height={50} />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveStyle({ width: '150px', height: '50px' })
    })

    it('accepts string values for width and height', () => {
      render(<Skeleton width="100%" height="2rem" />)

      const skeleton = screen.getByRole('status')
      expect(skeleton).toHaveStyle({ width: '100%', height: '2rem' })
    })
  })
})
