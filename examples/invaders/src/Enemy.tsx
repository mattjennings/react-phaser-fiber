import React from 'react'
import {
  ArcadeCollider,
  ArcadeSprite,
  ArcadeSpriteProps,
} from 'react-phaser-fiber'

export interface EnemyProps
  extends Omit<ArcadeSpriteProps, 'texture' | 'frame'> {
  x: number
  y: number
  onDestroy: () => any
}

export default function Enemy({ onDestroy, ...props }: EnemyProps) {
  return (
    <ArcadeSprite
      name="enemy"
      texture="invader"
      animation="enemy/fly"
      {...props}
    >
      <ArcadeCollider
        with="player-bullet"
        onCollide={() => {
          onDestroy()
        }}
      />
    </ArcadeSprite>
  )
}
