import React, { useState, useRef } from 'react'
import { ArcadeImage, ArcadeImageProps, useGameLoop } from 'react-phaser-fiber'

export interface MovingPlatformProps extends ArcadeImageProps {
  moving?: boolean
}
export default function MovingPlatform({
  moving,
  ...props
}: MovingPlatformProps) {
  const ref = useRef<Phaser.Physics.Arcade.Image>(null)
  const [velocity, setVelocity] = useState(
    moving
      ? {
          x: 50,
          y: 0,
        }
      : {
          x: 0,
          y: 0,
        }
  )

  useGameLoop(() => {
    if (ref.current) {
      if (ref.current.x <= 300) {
        setVelocity({
          x: 50,
          y: 0,
        })
      } else if (ref.current.x >= 500) {
        setVelocity({
          x: -50,
          y: 0,
        })
      }
    }
  })

  return (
    <ArcadeImage
      {...props}
      physicsType={moving ? 'dynamic' : 'static'}
      ref={ref}
      name="platform"
      texture="ground"
      immovable
      allowGravity={moving ? false : undefined}
      velocity={moving ? velocity : undefined}
    />
  )
}
