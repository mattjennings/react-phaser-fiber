import React, { useMemo } from 'react'
import { Image } from 'react-phaser'
import { ImageProps } from 'react-phaser/dist/components/Image'

export default function Block(props: Omit<ImageProps, 'texture'>) {
  return <Image texture="assets" {...props} />
}
