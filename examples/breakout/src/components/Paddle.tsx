import React, { useCallback, useState } from 'react'
import { ArcadeImage, useInputEvent } from 'react-phaser-fiber'

export interface PaddleProps {
  initialX: number
  initialY: number
}

function Paddle(
  { initialX, initialY }: PaddleProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  const [x, setX] = useState(initialX)

  // snap paddle to mouse X
  const updatePosition = useCallback((pointer: Phaser.Input.Pointer) => {
    setX(pointer.x)
  }, [])

  useInputEvent('pointermove', updatePosition)

  return (
    <ArcadeImage
      ref={ref}
      x={x}
      y={initialY}
      texture="assets"
      frame="paddle1"
      immovable
    />
  )
}

export default React.forwardRef(Paddle)
