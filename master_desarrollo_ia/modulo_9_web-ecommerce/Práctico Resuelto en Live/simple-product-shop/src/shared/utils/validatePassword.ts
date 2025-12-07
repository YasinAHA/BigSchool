interface ValidationResult {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'medium' | 'strong'
}

const MIN_LENGTH = 12
const STRONG_LENGTH = 16

const VALIDATION_RULES = [
  {
    test: (password: string) => password.length >= MIN_LENGTH,
    error: 'Password must be at least 12 characters',
  },
  {
    test: (password: string) => /[A-Z]/.test(password),
    error: 'Password must contain at least one uppercase letter',
  },
  {
    test: (password: string) => /[a-z]/.test(password),
    error: 'Password must contain at least one lowercase letter',
  },
  {
    test: (password: string) => /[0-9]/.test(password),
    error: 'Password must contain at least one number',
  },
  {
    test: (password: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    error: 'Password must contain at least one special character',
  },
]

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []

  for (const rule of VALIDATION_RULES) {
    if (!rule.test(password)) {
      errors.push(rule.error)
    }
  }

  const isValid = errors.length === 0

  let strength: ValidationResult['strength'] = 'weak'
  if (isValid) {
    strength = password.length >= STRONG_LENGTH ? 'strong' : 'medium'
  }

  return { isValid, errors, strength }
}
