import React, { useMemo, useRef, useState } from 'react'
import {
  ArcadeImage,
  ArcadeImageProps,
  ArcadeCollider,
} from 'react-phaser-fiber'

export interface StarProps extends ArcadeImageProps {}

export default function Star(props: StarProps) {
  const ref = useRef<Phaser.Physics.Arcade.Image>(null)
  const [destroyed, setDestroyed] = useState(false)
  const bounceY = useMemo(() => Phaser.Math.FloatBetween(0.4, 0.8), [])

  if (destroyed) {
    return null
  }

  return (
    <ArcadeImage
      {...props}
      ref={ref}
      name="star"
      texture="star"
      bounceY={bounceY}
    >
      <ArcadeCollider with="platform" />
      <ArcadeCollider
        with="player"
        overlapOnly
        onCollide={() => {
          setDestroyed(true)
        }}
      />
    </ArcadeImage>
  )
}
