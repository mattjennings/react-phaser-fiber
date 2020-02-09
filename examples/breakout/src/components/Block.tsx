import React from 'react'
import {
  ArcadeImage,
  ArcadeImageProps,
  ArcadeCollider,
  ArcadeColliderProps,
} from 'react-phaser-fiber'

export interface BlockProps extends Omit<ArcadeImageProps, 'texture'> {
  onBallHit: ArcadeColliderProps<
    Phaser.Physics.Arcade.Image,
    Phaser.Physics.Arcade.Image
  >['onCollide']
}

function Block({ onBallHit, ...props }: BlockProps) {
  return (
    <ArcadeCollider with="ball" onCollide={onBallHit}>
      {ref => (
        <ArcadeImage
          ref={ref}
          texture="assets"
          immovable
          physics="arcade"
          {...props}
        />
      )}
    </ArcadeCollider>
  )
}

export default Block
