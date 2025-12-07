import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginDemo } from './LoginDemo'

const VALID_PASSWORD = 'SecurePass123!'
const DEMO_EMAIL = 'demo@example.com'
const INVALID_EMAIL = 'wrong@example.com'

describe('LoginDemo', () => {
  describe('rendering', () => {
    it('renders email and password inputs', () => {
      render(<LoginDemo />)

      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    })
  })

  describe('form validation', () => {
    it('disables submit button when form is invalid', () => {
      render(<LoginDemo />)

      const submitButton = screen.getByRole('button', { name: 'Login' })
      expect(submitButton).toBeDisabled()
    })

    it('disables submit button with invalid email format', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText('Email'), 'invalid-email')
      await user.type(screen.getByLabelText('Password'), VALID_PASSWORD)

      expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
    })

    it('enables submit button when form is valid', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText('Email'), DEMO_EMAIL)
      await user.type(screen.getByLabelText('Password'), VALID_PASSWORD)

      expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled()
    })
  })

  describe('login simulation', () => {
    it('shows success message with demo email', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText('Email'), DEMO_EMAIL)
      await user.type(screen.getByLabelText('Password'), VALID_PASSWORD)
      await user.click(screen.getByRole('button', { name: 'Login' }))

      expect(screen.getByText(/welcome/i)).toBeInTheDocument()
    })

    it('shows error message with invalid credentials', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      await user.type(screen.getByLabelText('Email'), INVALID_EMAIL)
      await user.type(screen.getByLabelText('Password'), VALID_PASSWORD)
      await user.click(screen.getByRole('button', { name: 'Login' }))

      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  describe('rate limiting', () => {
    it('locks form after 3 failed attempts', async () => {
      const user = userEvent.setup()
      render(<LoginDemo />)

      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')
      const submitButton = screen.getByRole('button', { name: 'Login' })

      // Attempt 1
      await user.type(emailInput, INVALID_EMAIL)
      await user.type(passwordInput, VALID_PASSWORD)
      await user.click(submitButton)

      // Clear for attempt 2
      await user.clear(emailInput)
      await user.clear(passwordInput)

      // Attempt 2
      await user.type(emailInput, INVALID_EMAIL)
      await user.type(passwordInput, VALID_PASSWORD)
      await user.click(submitButton)

      // Clear for attempt 3
      await user.clear(emailInput)
      await user.clear(passwordInput)

      // Attempt 3 - this will trigger the lock
      await user.type(emailInput, INVALID_EMAIL)
      await user.type(passwordInput, VALID_PASSWORD)
      await user.click(submitButton)

      // After 3rd attempt, form should be locked
      expect(screen.getByText(/too many failed attempts/i)).toBeInTheDocument()
      expect(emailInput).toBeDisabled()
      expect(passwordInput).toBeDisabled()
    })
  })
})
