import React, { useCallback, useState } from 'react'
import { Image, useInputEvent } from 'react-phaser'

export interface PaddleProps {
  initialX: number
  initialY: number
}

const Paddle = React.forwardRef<Phaser.GameObjects.Image, PaddleProps>(
  ({ initialX, initialY }: PaddleProps, ref) => {
    const [x, setX] = useState(initialX)
    const [y, setY] = useState(initialY)

    const updatePosition = useCallback((pointer: Phaser.Input.Pointer) => {
      setX(pointer.x)
    }, [])

    useInputEvent('pointermove', updatePosition)

    return <Image ref={ref} x={x} y={y} texture="assets" frame="paddle1" />
  }
)

Paddle.displayName = 'Paddle'

export default Paddle
