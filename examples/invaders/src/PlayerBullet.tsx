import React, { useState } from 'react'
import {
  ArcadeSprite,
  ArcadeCollider,
  ArcadeSpriteProps,
  SpawnProps,
} from 'react-phaser-fiber'
import Explosion from './Explosion'

export default function PlayerBullet({
  onDestroy,
  ...props
}: ArcadeSpriteProps & SpawnProps) {
  const [destroyedAt, setDestroyedAt] = useState<{
    x: number
    y: number
  } | null>(null)

  if (destroyedAt) {
    return (
      <Explosion
        x={destroyedAt.x}
        y={destroyedAt.y - 32}
        onAnimationComplete={() => onDestroy()}
      />
    )
  }

  return (
    <ArcadeSprite
      name="playerBullet"
      texture="textures/player/bullet"
      depth={1}
      {...props}
    >
      <ArcadeCollider
        with="enemy"
        overlapOnly
        onCollide={(self: Phaser.Physics.Arcade.Sprite) => {
          setDestroyedAt({ x: self.x, y: self.y })
        }}
      />
    </ArcadeSprite>
  )
}
