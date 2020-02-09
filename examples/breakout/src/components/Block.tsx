import React from 'react'
import {
  ArcadeImage,
  ArcadeImageProps,
  ArcadeCollider,
  ArcadeColliderProps,
} from 'react-phaser-fiber'

export interface BlockProps extends Omit<ArcadeImageProps, 'texture'> {}

function Block(
  { ...props }: BlockProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  return (
    <ArcadeImage
      ref={ref}
      texture="assets"
      immovable
      physics="arcade"
      {...props}
    />
  )
}

export default React.forwardRef(Block)
