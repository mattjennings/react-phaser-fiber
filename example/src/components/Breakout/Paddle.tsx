import React, { useCallback, useState } from 'react'
import { Image, useInputEvent } from 'react-phaser'

export interface PaddleProps {
  initialX: number
  initialY: number
}

function Paddle(
  { initialX, initialY }: PaddleProps,
  ref: React.Ref<Phaser.GameObjects.Image>
) {
  const [x, setX] = useState(initialX)

  const updatePosition = useCallback((pointer: Phaser.Input.Pointer) => {
    setX(pointer.x)
  }, [])

  useInputEvent('pointermove', updatePosition)

  return <Image ref={ref} x={x} y={initialY} texture="assets" frame="paddle1" />
}

export default React.forwardRef(Paddle)
