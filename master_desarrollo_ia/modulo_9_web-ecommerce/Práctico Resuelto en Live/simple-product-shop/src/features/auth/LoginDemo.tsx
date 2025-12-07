import { useState } from 'react'
import * as Sentry from '@sentry/react'
import { validatePassword } from '@/shared/utils'
import { PasswordInput } from './components/PasswordInput'

type FormStatus = 'idle' | 'success' | 'error' | 'locked'

const DEMO_EMAIL = 'demo@example.com'
const MAX_ATTEMPTS = 3

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function LoginDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [touched, setTouched] = useState({ email: false, password: false })

  const isEmailValid = isValidEmail(email)
  const isPasswordValid = validatePassword(password).isValid
  const showEmailError = touched.email && !isEmailValid
  const showPasswordError = touched.password && !isPasswordValid
  const isFormValid = isEmailValid && isPasswordValid
  const isLocked = status === 'locked'
  const attemptsRemaining = MAX_ATTEMPTS - failedAttempts

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid || isLocked) return

    if (email === DEMO_EMAIL) {
      setStatus('success')
      setFailedAttempts(0)
      Sentry.setUser({
        email: email,
        id: 'demo-user-123',
      })
    } else {
      const newFailedAttempts = failedAttempts + 1
      setFailedAttempts(newFailedAttempts)

      if (newFailedAttempts >= MAX_ATTEMPTS) {
        setStatus('locked')
      } else {
        setStatus('error')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login Demo</h2>

      {status === 'success' && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between">
          <span>Welcome! Login successful.</span>
          <button
            onClick={() => {
              setStatus('idle')
              setEmail('')
              setPassword('')
              setTouched({ email: false, password: false })
              Sentry.setUser(null)
            }}
            className="text-green-800 hover:text-green-900 font-medium text-sm"
          >
            Logout
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Invalid credentials. {attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} remaining.
        </div>
      )}

      {status === 'locked' && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Too many failed attempts. Please try again later.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            disabled={isLocked}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${showEmailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="demo@example.com"
          />
          {showEmailError && (
            <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
          )}
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </span>
          <PasswordInput
            value={password}
            onChange={setPassword}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            showRequirements={password.length > 0 && !isPasswordValid}
            disabled={isLocked}
            hasError={showPasswordError}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLocked}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Hint: Use <code className="bg-gray-100 px-1 rounded">demo@example.com</code> with a valid password
      </p>
    </div>
  )
}
