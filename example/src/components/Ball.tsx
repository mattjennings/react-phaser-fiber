import React, { useMemo } from 'react'
import { Image } from 'react-phaser'
import { ImageProps } from 'react-phaser/dist/components/Image'

const Ball = React.forwardRef<
  Phaser.GameObjects.Image,
  Omit<ImageProps, 'ref' | 'texture'>
>((props, ref) => {
  return <Image ref={ref} texture="assets" frame="ball1" {...props} />
})

Ball.displayName = 'Ball'

export default Ball as React.ComponentType<Omit<ImageProps, 'texture'>>
