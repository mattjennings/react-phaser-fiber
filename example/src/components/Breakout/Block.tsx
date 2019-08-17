import React from 'react'
import { ArcadeImage } from 'react-phaser'
import { ArcadeImageProps } from 'react-phaser/dist/components/ArcadeImage'

function Block(
  props: Omit<ArcadeImageProps, 'texture'>,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  return <ArcadeImage ref={ref} texture="assets" immovable {...props} />
}

export default React.forwardRef(Block)
