import { useState } from 'react'

export function SimpleCounter(): JSX.Element {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <div data-testid="count-display">Count: {count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}

export default SimpleCounter
