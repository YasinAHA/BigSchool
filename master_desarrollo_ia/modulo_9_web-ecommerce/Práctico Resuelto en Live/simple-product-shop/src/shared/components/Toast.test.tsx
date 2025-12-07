import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from './Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('rendering', () => {
    it('renders message with role="alert"', () => {
      render(<Toast message="Test message" onClose={() => {}} />)

      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    it('has aria-live="polite" for accessibility', () => {
      render(<Toast message="Test message" onClose={() => {}} />)

      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('variants', () => {
    it('applies success variant styles (green)', () => {
      render(<Toast message="Success!" variant="success" onClose={() => {}} />)

      expect(screen.getByRole('alert')).toHaveClass('bg-green-600')
    })

    it('applies error variant styles (red)', () => {
      render(<Toast message="Error!" variant="error" onClose={() => {}} />)

      expect(screen.getByRole('alert')).toHaveClass('bg-red-600')
    })

    it('applies info variant styles (blue) by default', () => {
      render(<Toast message="Info" onClose={() => {}} />)

      expect(screen.getByRole('alert')).toHaveClass('bg-blue-600')
    })
  })

  describe('close behavior', () => {
    it('calls onClose when close button is clicked', async () => {
      vi.useRealTimers()
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(<Toast message="Test" onClose={handleClose} />)

      await user.click(screen.getByRole('button', { name: /close/i }))

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('auto-closes after 3 seconds', () => {
      const handleClose = vi.fn()

      render(<Toast message="Test" onClose={handleClose} />)

      expect(handleClose).not.toHaveBeenCalled()

      vi.advanceTimersByTime(3000)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('does not auto-close if autoClose is false', () => {
      const handleClose = vi.fn()

      render(<Toast message="Test" onClose={handleClose} autoClose={false} />)

      vi.advanceTimersByTime(5000)

      expect(handleClose).not.toHaveBeenCalled()
    })
  })
})
