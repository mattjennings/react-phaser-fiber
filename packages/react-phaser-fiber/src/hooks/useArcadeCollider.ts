import { Scene } from 'phaser'
import { useLayoutEffect, useMemo, useCallback } from 'react'
import { findGameObjectsByName } from '../utils'
import { useScene } from './useScene'
import { useSceneEvent } from './useSceneEvent'

export type ColliderObjectType =
  | Phaser.GameObjects.GameObject
  | Phaser.Physics.Arcade.Group
  | string

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

  const collider = useMemo(
    () =>
      scene.physics.add.collider(
        createObjectsArray(scene, obj1),
        createObjectsArray(scene, obj2),
        onCollide,
        onProcess
      ),
    []
  )

  // destroy collider on unmount
  useLayoutEffect(() => {
    return () => {
      collider.destroy()
    }
  }, [])

  // it is much more performant to update the collider via mutations
  // rather than destroy() and recreate in the above useLayoutEffect
  useLayoutEffect(() => {
    collider.object1 = createObjectsArray(scene, obj1)
    collider.object2 = createObjectsArray(scene, obj2)
  }, [...toArray(obj1), ...toArray(obj2)])

  // update callback refs
  useLayoutEffect(() => {
    collider.collideCallback = onCollide
    collider.processCallback = onProcess
    collider.overlapOnly = overlapOnly
  }, [onCollide, onProcess, overlapOnly])

  // if obj1 or obj2 contains strings, we'll want to include any new objects that are created with
  // a name that matches the string
  useSceneEvent(
    'CHILD_ADDED',
    useCallback(
      (object: Phaser.GameObjects.GameObject) => {
        if (object.name) {
          const obj1Strings = toArray(obj1).filter(
            obj => typeof obj === 'string'
          ) as string[]

          const obj2Strings = toArray(obj2).filter(
            obj => typeof obj === 'string'
          ) as string[]

          if (obj1Strings.includes(object.name)) {
            collider.object1 = [...(collider.object1 as any[]), object]
          }

          if (obj2Strings.includes(object.name)) {
            collider.object2 = [...(collider.object2 as any[]), object]
          }
        }
      },
      [...toArray(obj1), ...toArray(obj2)]
    )
  )
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
