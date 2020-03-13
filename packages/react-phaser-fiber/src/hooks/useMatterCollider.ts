import React, { useLayoutEffect, useRef, useEffect } from 'react'
import { useScene } from './useScene'
import { Scene } from 'phaser'

export default function useMatterCollider(
  obj1: React.RefObject<any> | React.RefObject<any>[],
  obj2: React.RefObject<any> | React.RefObject<any>[],
  onCollide: (obj1: any, obj2: any) => any
  // onProcess?: (obj1: any, obj2: any) => boolean
) {
  const scene: Scene = useScene()

  useLayoutEffect(() => {
    const onCollisionStart = (
      event: Phaser.Physics.Matter.Events.CollisionStartEvent
    ) => {
      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair
        const gameObjectA = bodyA.gameObject
        const gameObjectB = bodyB.gameObject

        const isInA = Array.isArray(obj1)
          ? obj1.map(ref => ref.current)
          : [obj1.current]
        const isInB = Array.isArray(obj2)
          ? obj2.map(ref => ref.current)
          : [obj2.current]

        if (isInA.includes(gameObjectA) && isInB.includes(gameObjectB)) {
          onCollide(gameObjectA, gameObjectB)
        }
      })
    }

    // Subscribe to Matter Events
    const matter = scene.matter
    if (!matter || !matter.world) {
      console.warn('Hook requires matter!')
      return
    }
    matter.world.on('collisionstart', onCollisionStart)
    // matter.world.on('collisionactive', onCollisionActive)
    // matter.world.on('collisionend', onCollisionEnd)

    return () => {
      // Don't unsub if matter next existing or if the game is destroyed
      if (!matter || !matter.world) return
      matter.world.off('collisionstart', onCollisionStart)
      // matter.world.off('collisionactive', onCollisionActive)
      // matter.world.off('collisionend', onCollisionEnd)
    }
  })
}
