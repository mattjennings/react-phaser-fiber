import { useLayoutEffect, useRef } from 'react'
import { useScene } from './useScene'
import { Scene } from 'phaser'
import { findGameObjectsByName } from '../utils'

export type ColliderObjectType = Phaser.GameObjects.GameObject | string

/**
 * Creates a collider between objects or arrays of objects. If provided values are strings, it will
 * search for all objects by that name in the scene.
 */
export function useArcadeCollider<
  T1 extends ColliderObjectType,
  T2 extends ColliderObjectType
>(
  obj1: T1 | T1[],
  obj2: T2 | T2[],
  args: {
    overlapOnly?: boolean
    onCollide: (
      obj1: T1 extends string ? any : T1,
      obj2: T2 extends string ? any : T2
    ) => any
    onProcess?: (
      obj1: T1 extends string ? any : T1,
      obj2: T2 extends string ? any : T2
    ) => boolean
  }
) {
  const { onCollide, onProcess, overlapOnly } = args
  const scene = useScene()
  const collider = useRef<Phaser.Physics.Arcade.Collider>(null)

  useLayoutEffect(() => {
    collider.current = scene.physics.add.collider(
      createObjectsArray(scene, obj1),
      createObjectsArray(scene, obj2),
      onCollide,
      onProcess
    )

    collider.current.overlapOnly = overlapOnly

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
      collider.current.object1 = createObjectsArray(scene, obj1)
      collider.current.object2 = createObjectsArray(scene, obj2)
    }
  }, [obj1, obj2])

  useLayoutEffect(() => {
    if (collider.current) {
      collider.current.collideCallback = onCollide
      collider.current.processCallback = onProcess
      collider.current.overlapOnly = overlapOnly
    }
  }, [onCollide, onProcess, overlapOnly])
}

function createObjectsArray(
  scene: Scene,
  objects: ColliderObjectType | ColliderObjectType[]
) {
  return toArray(objects).reduce(
    (total: Phaser.GameObjects.GameObject[], object) => {
      if (typeof object === 'string') {
        return [...total, ...findGameObjectsByName(scene, object)]
      }

      return [...total, object]
    },
    []
  ) as Phaser.GameObjects.GameObject[]
}

function toArray<T>(obj: T): T[] {
  return Array.isArray(obj) ? obj : [obj]
}
