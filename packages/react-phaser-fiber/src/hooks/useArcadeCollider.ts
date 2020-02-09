import { useLayoutEffect, useRef } from 'react'
import useScene from './useScene'

export default function useArcadeCollider(
  obj1: any | any[],
  obj2: any | any[],
  onCollide: (obj1: any, obj2: any) => any,
  onProcess?: (obj1: any, obj2: any) => boolean
) {
  const scene = useScene()
  const collider = useRef<Phaser.Physics.Arcade.Collider>(null)

  useLayoutEffect(() => {
    collider.current = scene.physics.add.collider(
      obj1 || [],
      obj2 || [],
      onCollide,
      onProcess
    )

    return () => {
      if (collider.current) {
        collider.current.destroy()
      }
    }
  }, [])

  // it is much more performant to update the collider via mutations
  // rather than destroy() and recreate in the above useLayoutEffect
  useLayoutEffect(() => {
    if (collider.current) {
      collider.current.object1 = obj1
      collider.current.object2 = obj2
    }
  }, [obj1, obj2])

  useLayoutEffect(() => {
    if (collider.current) {
      collider.current.collideCallback = onCollide
      collider.current.processCallback = onProcess
    }
  }, [onCollide, onProcess])
}
