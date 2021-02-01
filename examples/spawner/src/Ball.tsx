import React, { useMemo, useEffect, useRef } from 'react'
import {
  ArcadeImage,
  ArcadeImageProps,
  SpawnProps,
  useTimer,
} from 'react-phaser-fiber'

export type BallProps = Omit<ArcadeImageProps, 'texture'> & SpawnProps

function Ball({ onDestroy, ...props }: BallProps) {
  const ref = useRef(null)
  // create a random velocity and memoize it so it doesn't change on re-renders
  const velocity = useMemo(() => {
    const speed = 450
    const angle = (Math.floor(Math.random() * 360) / 180) * Math.PI

    return {
      x: speed * Math.cos(angle),
      y: speed * Math.sin(angle),
    }
  }, [])

  // destroy self after 3 seconds
  useTimer(onDestroy, 3000)

  return (
    <ArcadeImage
      ref={ref}
      texture="assets"
      frame="ball1"
      velocity={velocity}
      bounce={1}
      collideWorldBounds
      {...props}
    />
  )
}

export default Ball
