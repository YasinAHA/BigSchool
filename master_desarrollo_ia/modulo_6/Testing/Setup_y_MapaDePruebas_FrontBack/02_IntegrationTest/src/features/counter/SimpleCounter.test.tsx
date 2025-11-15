import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SimpleCounter } from './SimpleCounter'

describe('SimpleCounter - integration', () => {
  test('AAA - shows initial count and increments when user clicks Increment', () => {
    // Arrange
    render(<SimpleCounter />)
    const button = screen.getByRole('button', { name: /increment/i })
    const display = screen.getByTestId('count-display')

    // Assert (initial)
    expect(display).toHaveTextContent('Count: 0')

    // Act
    fireEvent.click(button)

    // Assert (after click)
    expect(display).toHaveTextContent('Count: 1')
  })
})
