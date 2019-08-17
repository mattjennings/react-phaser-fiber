import React, { useLayoutEffect } from 'react'
import { useScene } from '../../hooks'

export interface ArcadeColliderProps<
  O1 extends Phaser.GameObjects.GameObject,
  O2 extends Phaser.GameObjects.GameObject
> {
  between: [React.RefObject<O1>, React.RefObject<O2>]
  overlapOnly?: boolean
  onCollide?: (obj1: O1, obj2: O2) => any
  onProcess?: (obj1: O1, obj2: O2) => boolean
}

export default function ArcadeCollider<
  O1 extends Phaser.GameObjects.GameObject,
  O2 extends Phaser.GameObjects.GameObject
>({ between, onCollide, onProcess }: ArcadeColliderProps<O1, O2>): JSX.Element {
  const scene = useScene()

  useLayoutEffect(() => {
    const collider = scene.physics.add.collider(
      between[0] && between[0].current,
      between[1] && between[1].current,
      onCollide,
      onProcess
    )
    return () => {
      collider.destroy()
    }
  }, [...between, onCollide, onProcess])

  return null
}
