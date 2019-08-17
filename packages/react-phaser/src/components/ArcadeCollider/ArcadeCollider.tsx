import React, { useLayoutEffect, useRef } from 'react'
import { useScene } from '../../hooks'

export interface ArcadeColliderProps {
  collideWith: Array<React.RefObject<any>>
  children: (ref: React.Ref<any>) => JSX.Element
  onCollide?: (obj1: any, obj2: any) => any
  onProcess?: (obj1: any, obj2: any) => any
}

export default function ArcadeCollider({
  children,
  collideWith,
  onCollide,
  onProcess,
}: ArcadeColliderProps): JSX.Element {
  const scene = useScene()
  const childRef = useRef(null)

  useLayoutEffect(() => {
    let collider: Phaser.Physics.Arcade.Collider

    // this timeout feels gross. it's necessary because otherwise
    // `collideWith` refs are null for sibling components _after_ this one
    // is there a better solution?
    setTimeout(() => {
      collider = scene.physics.add.collider(
        childRef.current,
        collideWith.map(ref => ref.current),
        onCollide,
        onProcess
      )
    })

    return () => {
      if (collider) {
        collider.destroy()
      }
    }
  }, [...collideWith, onCollide, onProcess])

  return children ? children(childRef) : null
}
