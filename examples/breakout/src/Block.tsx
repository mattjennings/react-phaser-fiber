import React from 'react'
import {
  ArcadeImage,
  ArcadeImageProps,
  ArcadeCollider,
} from 'react-phaser-fiber'

export interface BlockProps extends Omit<ArcadeImageProps, 'texture'> {
  onBallHit: () => any
}

function Block(
  { onBallHit, ...props }: BlockProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  return (
    <ArcadeImage
      ref={ref}
      texture="assets"
      immovable
      physics="arcade"
      {...props}
    >
      <ArcadeCollider with="ball" onCollide={() => onBallHit()} />
    </ArcadeImage>
  )
}

export default React.forwardRef(Block)
