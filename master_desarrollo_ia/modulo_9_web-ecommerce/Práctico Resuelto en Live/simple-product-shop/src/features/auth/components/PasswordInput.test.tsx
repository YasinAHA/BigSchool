import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordInput } from './PasswordInput'

const STRENGTH_BAR_TEST_ID = 'strength-bar'

describe('PasswordInput', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    showRequirements: false,
  }

  describe('rendering', () => {
    it('renders the password input', () => {
      render(<PasswordInput {...defaultProps} />)

      const input = screen.getByLabelText('Password')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('user interaction', () => {
    it('calls onChange when user types', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<PasswordInput {...defaultProps} onChange={onChange} />)

      const input = screen.getByLabelText('Password')
      await user.type(input, 'test')

      expect(onChange).toHaveBeenCalled()
    })

    it('toggles password visibility when toggle button is clicked', async () => {
      const user = userEvent.setup()
      render(<PasswordInput {...defaultProps} value="secret123" />)

      const input = screen.getByLabelText('Password')
      const toggleButton = screen.getByLabelText('Show')

      expect(input).toHaveAttribute('type', 'password')

      await user.click(toggleButton)

      expect(input).toHaveAttribute('type', 'text')
      expect(screen.getByLabelText('Hide')).toBeInTheDocument()

      await user.click(screen.getByLabelText('Hide'))

      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('requirements display', () => {
    it('shows requirements when showRequirements is true', () => {
      render(<PasswordInput {...defaultProps} showRequirements={true} value="weak" />)

      expect(screen.getByText('Password must be at least 12 characters')).toBeInTheDocument()
    })

    it('does not show requirements when showRequirements is false', () => {
      render(<PasswordInput {...defaultProps} showRequirements={false} value="weak" />)

      expect(screen.queryByText('Password must be at least 12 characters')).not.toBeInTheDocument()
    })

    it('shows checkmark for passing requirements', () => {
      render(<PasswordInput {...defaultProps} showRequirements={true} value="ABC" />)

      const uppercaseRequirement = screen.getByText('Password must contain at least one uppercase letter')
      expect(uppercaseRequirement.closest('li')).toHaveClass('text-green-600')
    })
  })

  describe('strength indicator', () => {
    it('shows weak strength for invalid password', () => {
      render(<PasswordInput {...defaultProps} value="weak" />)

      expect(screen.getByText('Weak')).toBeInTheDocument()
      expect(screen.getByTestId(STRENGTH_BAR_TEST_ID)).toHaveClass('bg-red-500')
    })

    it('shows medium strength for valid 12-15 character password', () => {
      render(<PasswordInput {...defaultProps} value="Abcdefgh123!" />)

      expect(screen.getByText('Medium')).toBeInTheDocument()
      expect(screen.getByTestId(STRENGTH_BAR_TEST_ID)).toHaveClass('bg-yellow-500')
    })

    it('shows strong strength for valid 16+ character password', () => {
      render(<PasswordInput {...defaultProps} value="Abcdefghijk123!@" />)

      expect(screen.getByText('Strong')).toBeInTheDocument()
      expect(screen.getByTestId(STRENGTH_BAR_TEST_ID)).toHaveClass('bg-green-500')
    })
  })
})
