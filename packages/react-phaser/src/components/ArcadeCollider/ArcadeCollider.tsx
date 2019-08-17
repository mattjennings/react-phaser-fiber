import React, { useLayoutEffect, useRef, useEffect } from 'react'
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
  let collider = useRef<Phaser.Physics.Arcade.Collider>(null)

  useLayoutEffect(() => {
    // this timeout feels gross. it's necessary because otherwise
    // `collideWith` refs are null for sibling components _after_ this one
    // is there a better solution?
    setTimeout(() => {
      collider.current = scene.physics.add.collider(
        childRef.current,
        collideWith.map(ref => ref.current),
        onCollide,
        onProcess
      )
    })

    return () => {
      if (collider.current) {
        collider.current.destroy()
      }
    }
  }, [])

  // it is much more performant to update the collider via mutations
  // rather than destroy() and recreate in the above useLayoutEffect
  useEffect(() => {
    if (collider.current) {
      collider.current.object2 = collideWith.map(ref => ref.current)
    }
  }, [...collideWith, onCollide, onProcess])

  useEffect(() => {
    if (collider.current) {
      collider.current.collideCallback = onCollide
      collider.current.processCallback = onProcess
    }
  }, [onCollide, onProcess])

  return children ? children(childRef) : null
}
