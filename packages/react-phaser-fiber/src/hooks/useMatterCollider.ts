import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { useScene } from './useScene'
import { Scene } from 'phaser'
import { findGameObjectsByName } from '../utils'
import { toArray } from '../utils/toArray'
import { useSceneEvent } from './useSceneEvent'

export type MatterColliderObject = Phaser.GameObjects.GameObject | string
export type MatterCollisionStoreType = {
  object1: Phaser.GameObjects.GameObject[]
  object2: Phaser.GameObjects.GameObject[]
}
export type MatterCollisionCallback<T1, T2> = (
  obj1: T1 extends string ? any : T1,
  obj2: T2 extends string ? any : T2
) => any

export function useMatterCollider<
  T1 extends MatterColliderObject,
  T2 extends MatterColliderObject
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
  const matter = scene.matter
  if (!matter || !matter.world) {
    throw Error('useMatterCollider requires a matter physics engine')
  }

  // get the gameobject instances from obj1/obj2 params
  const [obj1Instances, setObj1Instances] = useState(
    createObjectsArray(scene, obj1)
  )
  const [obj2Instances, setObj2Instances] = useState(
    createObjectsArray(scene, obj2)
  )

  // update instances if obj1 or obj2 param changes
  useLayoutEffect(() => {
    setObj1Instances(createObjectsArray(scene, obj1))
    setObj2Instances(createObjectsArray(scene, obj2))
  }, [...toArray(obj1), ...toArray(obj2)])

  // update string references in obj1/obj2 when a child is added to the scene
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
            setObj1Instances(prev => [...prev, object])
          }

          if (obj2Strings.includes(object.name)) {
            setObj2Instances(prev => [...prev, object])
          }
        }
      },
      [setObj1Instances, setObj2Instances]
    )
  )

  // create the collision callbacks
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

          if (
            obj1Instances.includes(gameObjectA) &&
            obj2Instances.includes(gameObjectB)
          ) {
            callback(gameObjectA, gameObjectB)
          } else if (
            obj1Instances.includes(gameObjectB) &&
            obj2Instances.includes(gameObjectA)
          ) {
            callback(gameObjectB, gameObjectA)
          }
        })
      }

      if (event && callback) {
        matter.world.on(event, fn)
        return () => matter.world.off(event, fn)
      } else {
        return () => false
      }
    }

    const removeCollideCallback = createCollisionCallback(
      'collisionstart',
      onCollide
    )
    const removeActiveCallback = createCollisionCallback(
      'collisionactive',
      onCollideActive
    )
    const removeEndCallback = createCollisionCallback(
      'collisionend',
      onCollideEnd
    )

    return () => {
      // unsub if safe to do so
      if (matter?.world) {
        removeCollideCallback()
        removeActiveCallback()
        removeEndCallback()
      }
    }
  }, [obj1Instances, obj2Instances, onCollide, onCollideActive, onCollideEnd])
}

/**
 * Returns the gameobject instances for any objects that are string references
 */
function createObjectsArray(
  scene: Scene,
  objects: MatterColliderObject | MatterColliderObject[]
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
