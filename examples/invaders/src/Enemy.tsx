import React, { useLayoutEffect } from 'react'
import {
  ArcadeCollider,
  ArcadeSprite,
  ArcadeSpriteProps,
  useScene,
} from 'react-phaser-fiber'

export interface EnemyProps
  extends Omit<ArcadeSpriteProps, 'texture' | 'frame'> {
  x: number
  y: number
  onDestroy: () => any
  onExitedWorld: () => any
}

export default function Enemy({
  onDestroy,
  onExitedWorld,
  ...props
}: EnemyProps) {
  const scene = useScene()

  useLayoutEffect(() => {
    function checkOutOfBounds(body: any, up: boolean, down: boolean) {
      // enemy has hit bottom of screen
      if (down) {
        onExitedWorld()
      }
    }
    scene.physics.world.on('worldbounds', checkOutOfBounds)

    return () => {
      scene.physics.world.off('worldbounds', checkOutOfBounds)
    }
  }, [onExitedWorld, scene.physics.world])

  return (
    <ArcadeSprite
      name="enemy"
      animation="anims/enemy/fly"
      collideWorldBounds
      onWorldBounds
      {...props}
    >
      <ArcadeCollider
        with="playerBullet"
        overlapOnly
        onCollide={() => {
          // this setTimeout is so that we don't destroy the enemy before the PlayerBullet collider is run
          setTimeout(() => {
            onDestroy()
          })
        }}
      />
    </ArcadeSprite>
  )
}
