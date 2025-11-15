import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from './LikeButton'

test('increments likes when clicked', async () => {
  render(<LikeButton />)
  const user = userEvent.setup()
  const button = screen.getByRole('button', { name: /like \(0\)/i })
  await user.click(button)
  // wait for the updated button text to avoid act(...) warnings
  expect(await screen.findByRole('button', { name: /like \(1\)/i })).toBeTruthy()
})
