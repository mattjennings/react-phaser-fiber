import React from 'react'
import { Image } from 'react-phaser'
import { ImageProps } from 'react-phaser/dist/components/Image'

function Ball(
  props: Omit<ImageProps, 'ref' | 'texture'>,
  ref: React.Ref<Phaser.GameObjects.Image>
) {
  return <Image ref={ref} texture="assets" frame="ball1" {...props} />
}

export default React.forwardRef(Ball)
