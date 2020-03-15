import React, { useState } from 'react'
import {
  ArcadeCollider,
  ArcadeImage,
  ArcadeImageProps,
  SpawnProps,
} from 'react-phaser-fiber'
import Explosion from './Explosion'

export default function EnemyBullet({
  onDestroy,
  ...props
}: ArcadeImageProps & SpawnProps) {
  const [destroyedAt, setDestroyedAt] = useState<{
    x: number
    y: number
  } | null>(null)

  if (destroyedAt) {
    return (
      <Explosion
        x={destroyedAt.x}
        y={destroyedAt.y}
        onAnimationComplete={() => onDestroy()}
      />
    )
  }

  return (
    <ArcadeImage name="enemyBullet" texture="textures/enemy/bullet" {...props}>
      <ArcadeCollider
        with="player"
        overlapOnly
        onCollide={(self: Phaser.Physics.Arcade.Sprite) => {
          setDestroyedAt({ x: self.x, y: self.y })
        }}
      />
    </ArcadeImage>
  )
}
