import React, { useLayoutEffect, useMemo } from 'react'
import { GameObject, useGameObject, useScene } from 'react-phaser-fiber'

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
  const scene = useScene()
  const instance = useMemo(() => new Phaser.GameObjects.Graphics(scene), [
    scene,
  ])

  useLayoutEffect(() => {
    instance.clear()

    instance.lineStyle(5, color, 1.0)
    instance.beginPath()
    instance.moveTo(from.x, from.y)
    instance.lineTo(to.x, to.y)
    instance.closePath()
    instance.strokePath()
  }, [color, from.x, from.y, instance, to.x, to.y])

  return <GameObject instance={instance} {...props} />
}
