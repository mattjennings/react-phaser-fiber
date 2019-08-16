import React from 'react'
import { Image } from 'react-phaser'
import { ImageProps } from 'react-phaser/dist/components/Image'

function Block(
  props: Omit<ImageProps, 'texture'>,
  ref: React.Ref<Phaser.GameObjects.Image>
) {
  return <Image ref={ref} texture="assets" {...props} />
}

export default React.forwardRef(Block)
