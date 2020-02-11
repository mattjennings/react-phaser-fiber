import React, { useLayoutEffect } from 'react'
import { GameObject, useGameObject } from 'react-phaser-fiber'

export interface LineProps {
  from: {
    x: number
    y: number
  }
  to: {
    x: number
    y: number
  }
  color: number
}

export default function Line({ color, from, to, ...props }: LineProps) {
  const object = useGameObject(scene => new Phaser.GameObjects.Graphics(scene))

  useLayoutEffect(() => {
    object.clear()

    object.lineStyle(5, color, 1.0)
    object.beginPath()
    object.moveTo(from.x, from.y)
    object.lineTo(to.x, to.y)
    object.closePath()
    object.strokePath()
  }, [color, from.x, from.y, object, to.x, to.y])

  return <GameObject object={object} {...props} />
}
