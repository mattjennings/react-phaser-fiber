import React from 'react'
import { ArcadeImage } from 'react-phaser'
import { ArcadeImageProps } from 'react-phaser/dist/components/ArcadeImage'

function Ball(
  props: Omit<ArcadeImageProps, 'ref' | 'texture'>,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  return <ArcadeImage ref={ref} texture="assets" frame="ball1" {...props} />
}

export default React.forwardRef(Ball)
