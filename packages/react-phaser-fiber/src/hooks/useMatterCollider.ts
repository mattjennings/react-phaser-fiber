import React, { useLayoutEffect, useRef, useEffect } from 'react'
import { useScene } from './useScene'
import { Scene } from 'phaser'
import { findGameObjectsByName } from '../utils'

export type MatterColliderObjectType = Phaser.GameObjects.GameObject | string
export type MatterCollisionStoreType = {
  object1: Phaser.GameObjects.GameObject[]
  object2: Phaser.GameObjects.GameObject[]
}
export type MatterCollisionCallback<T1, T2> = (
  obj1: T1 extends string ? any : T1,
  obj2: T2 extends string ? any : T2
) => any

export function useMatterCollider<
  T1 extends MatterColliderObjectType,
  T2 extends MatterColliderObjectType
>(
  obj1: T1 | T1[],
  obj2: T2 | T2[],
  args: {
    onCollide?: MatterCollisionCallback<T1, T2>
    onCollideActive?: MatterCollisionCallback<T1, T2>
    onCollideEnd?: MatterCollisionCallback<T1, T2>
  }
) {
  const { onCollide, onCollideActive, onCollideEnd } = args
  const scene = useScene()
  const collider = useRef<MatterCollisionStoreType>(null)

  useLayoutEffect(() => {
    collider.current = {
      object1: createObjectsArray(scene, obj1),
      object2: createObjectsArray(scene, obj2),
    }
    return () => {}
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
    const createCollisionCallback = (
      event: string,
      callback: MatterCollisionCallback<T1, T2>
    ) => {
      const fn = (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
        event.pairs.forEach(pair => {
          const { bodyA, bodyB } = pair
          const gameObjectA = bodyA.gameObject
          const gameObjectB = bodyB.gameObject
          const { object1, object2 } = collider.current
          if (object1.includes(gameObjectA) && object2.includes(gameObjectB)) {
            callback(gameObjectA, gameObjectB)
          } else if (
            object1.includes(gameObjectB) &&
            object2.includes(gameObjectA)
          ) {
            callback(gameObjectB, gameObjectA)
          }
        })
      }
      if (event && callback) {
        matter.world.on(event, fn)
        return () => matter.world.off(event, fn)
      }
      return () => false
    }

    // Subscribe to Matter Events
    const matter = scene.matter
    if (!matter || !matter.world) {
      console.warn('Hook requires matter!')
      return
    }

    const collideCallback = createCollisionCallback('collisionstart', onCollide)
    const activeCallback = createCollisionCallback(
      'collisionactive',
      onCollideActive
    )
    const endCallback = createCollisionCallback('collisionend', onCollideEnd)

    return () => {
      // Don't unsub if matter next existing or if the game is destroyed
      if (!matter || !matter.world) return
      collideCallback()
      activeCallback()
      endCallback()
    }
  }, [onCollide, onCollideActive, onCollideEnd])
}

export function createObjectsArray(
  scene: Scene,
  objects: MatterColliderObjectType | MatterColliderObjectType[]
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
