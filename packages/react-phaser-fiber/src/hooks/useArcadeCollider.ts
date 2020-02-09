import { useLayoutEffect, useRef } from 'react'
import useScene from './useScene'
import { Scene } from 'phaser'

type ColliderObjectType = Phaser.GameObjects.GameObject | string

export default function useArcadeCollider(
  obj1: ColliderObjectType | ColliderObjectType[],
  obj2: ColliderObjectType | ColliderObjectType[],
  onCollide: (obj1: any, obj2: any) => any,
  onProcess?: (obj1: any, obj2: any) => boolean
) {
  const scene = useScene()
  const collider = useRef<Phaser.Physics.Arcade.Collider>(null)

  useLayoutEffect(() => {
    collider.current = scene.physics.add.collider(
      createObjectsArray(scene, obj1),
      createObjectsArray(scene, obj2),
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
      collider.current.object1 = createObjectsArray(scene, obj1)
      collider.current.object2 = createObjectsArray(scene, obj2)
    }
  }, [obj1, obj2])

  useLayoutEffect(() => {
    if (collider.current) {
      collider.current.collideCallback = onCollide
      collider.current.processCallback = onProcess
    }
  }, [onCollide, onProcess])
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

function findGameObjectsByName(scene: Scene, name: string) {
  return scene.children.list.filter(child => child.name === name)
}

function toArray<T>(obj: T): T[] {
  return Array.isArray(obj) ? obj : [obj]
}
