import React, { useMemo } from 'react'
import { Image } from 'react-phaser'
import { ImageProps } from 'react-phaser/dist/components/Image'

const frames = ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1']
export default function Block(props: Omit<ImageProps, 'texture' | 'frame'>) {
  const frame = useMemo(() => {
    return frames[Math.floor(Math.random() * frames.length)]
  }, [])
  return <Image texture="assets" frame={frame} {...props} />
}
