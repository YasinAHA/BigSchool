import { describe, it, expect } from 'vitest'
import { validatePassword } from './validatePassword'

describe('validatePassword', () => {
  describe('length validation', () => {
    it('fails with less than 12 characters', () => {
      const result = validatePassword('Abc123!@#')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must be at least 12 characters')
    })
  })

  describe('character requirements', () => {
    it('fails without uppercase letter', () => {
      const result = validatePassword('abcdefgh123!@#')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one uppercase letter')
    })

    it('fails without lowercase letter', () => {
      const result = validatePassword('ABCDEFGH123!@#')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one lowercase letter')
    })

    it('fails without number', () => {
      const result = validatePassword('Abcdefghijk!@#')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one number')
    })

    it('fails without special character', () => {
      const result = validatePassword('Abcdefghijk123')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one special character')
    })
  })

  describe('password strength', () => {
    it('returns weak for invalid passwords', () => {
      const result = validatePassword('short')

      expect(result.strength).toBe('weak')
    })

    it('returns medium for valid passwords with 12-15 characters', () => {
      const result = validatePassword('Abcdefgh123!')

      expect(result.isValid).toBe(true)
      expect(result.strength).toBe('medium')
    })

    it('returns strong for valid passwords with 16+ characters', () => {
      const result = validatePassword('Abcdefghijk123!@')

      expect(result.isValid).toBe(true)
      expect(result.strength).toBe('strong')
    })
  })

  describe('valid password', () => {
    it('returns isValid true and empty errors for valid password', () => {
      const result = validatePassword('SecurePass123!')

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual([])
    })
  })

  describe('multiple errors', () => {
    it('returns all applicable errors', () => {
      const result = validatePassword('abc')

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must be at least 12 characters')
      expect(result.errors).toContain('Password must contain at least one uppercase letter')
      expect(result.errors).toContain('Password must contain at least one number')
      expect(result.errors).toContain('Password must contain at least one special character')
    })
  })
})
