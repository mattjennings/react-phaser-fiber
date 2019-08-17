import React, { useLayoutEffect, useRef, useEffect } from 'react'
import useScene from './useScene'

export default function useArcadeCollider(
  obj1: React.RefObject<any> | React.RefObject<any>[],
  obj2: React.RefObject<any> | React.RefObject<any>[],
  onCollide: (obj1: any, obj2: any) => any,
  onProcess?: (obj1: any, obj2: any) => boolean
) {
  const scene = useScene()
  let collider = useRef<Phaser.Physics.Arcade.Collider>(null)

  useLayoutEffect(() => {
    // this timeout feels gross. it's necessary because otherwise
    // `collideWith` refs are null for sibling components _after_ this one
    // is there a better solution?
    setTimeout(() => {
      collider.current = scene.physics.add.collider(
        Array.isArray(obj1) ? obj1.map(ref => ref.current) : obj1.current,
        Array.isArray(obj2) ? obj2.map(ref => ref.current) : obj2.current,
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
      collider.current.object1 = Array.isArray(obj1)
        ? obj1.map(ref => ref.current)
        : obj1.current
      collider.current.object2 = Array.isArray(obj2)
        ? obj2.map(ref => ref.current)
        : obj2.current
    }
  }, [
    // spread into deps if obj is array
    Array.isArray(obj1) ? [...obj1] : obj1,
    Array.isArray(obj2) ? [...obj2] : obj2,
  ])

  useEffect(() => {
    if (collider.current) {
      collider.current.collideCallback = onCollide
      collider.current.processCallback = onProcess
    }
  }, [onCollide, onProcess])
}
