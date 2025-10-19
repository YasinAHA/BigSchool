import { describe, expect, it } from 'vitest'
import checkHealth from '../../src/shared/health'

describe('getHealth', () => {
  it('returns status ok and a valid ISO timestamp', () => {
    const h = checkHealth()
    expect(h.status).toBe('ok')
    // timestamp should be a valid ISO string
    expect(() => new Date(h.timestamp)).not.toThrow()
    expect(new Date(h.timestamp).toISOString()).toBe(h.timestamp)
  })
})
