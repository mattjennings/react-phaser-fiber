import React, { useLayoutEffect, useRef, useEffect } from 'react'
import useScene from './useScene'

export default function useArcadeCollider(
  obj1: any | any[],
  obj2: any | any[],
  onCollide: (obj1: any, obj2: any) => any,
  onProcess?: (obj1: any, obj2: any) => boolean
) {
  const scene = useScene()
  let collider = useRef<Phaser.Physics.Arcade.Collider>(null)

  useLayoutEffect(() => {
    // this timeout feels gross. it's necessary because otherwise
    // `collideWith` refs are null for sibling components _after_ this one
    // is there a better solution?
    // setTimeout(() => {
    collider.current = scene.physics.add.collider(
      obj1 || [],
      obj2 || [],
      onCollide,
      onProcess
    )
    // })

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
      collider.current.object1 = obj1
      collider.current.object2 = obj2
    }
  }, [obj1, obj2])

  useEffect(() => {
    if (collider.current) {
      collider.current.collideCallback = onCollide
      collider.current.processCallback = onProcess
    }
  }, [onCollide, onProcess])
}
