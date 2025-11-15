import { useState } from 'react'

export default function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button onClick={() => setLikes((l) => l + 1)}>
      Like ({likes})
    </button>
  )
}
