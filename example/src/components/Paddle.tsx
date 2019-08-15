import React, { useCallback, useState } from 'react'
import { Image, useInputEvent } from 'react-phaser'

export interface PaddleProps {
  initialX: number
  initialY: number
}

export default function Paddle({ initialX, initialY }: PaddleProps) {
  const [x, setX] = useState(initialX)
  const [y, setY] = useState(initialY)

  const updatePosition = useCallback((pointer: Phaser.Input.Pointer) => {
    setX(pointer.x)
  }, [])

  useInputEvent('pointermove', updatePosition)

  return <Image x={x} y={y} texture="assets" frame="paddle1" />
}
