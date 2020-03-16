import React from 'react'
import { Sprite, SpriteProps } from 'react-phaser-fiber'

export interface ExplosionProps
  extends Omit<SpriteProps, 'texture' | 'animation'> {}

export default function Explosion(props: ExplosionProps) {
  return (
    <Sprite
      depth={30}
      animation="anims/explosion"
      scale={0.75}
      {...props}
    ></Sprite>
  )
}
