import React, { useMemo, useEffect } from 'react'
import { ArcadeImage, ArcadeImageProps, SpawnProps } from 'react-phaser-fiber'

export type BallProps = Omit<ArcadeImageProps, 'texture'> & SpawnProps

function Ball(props: BallProps) {
  // create a random velocity and memoize it so it doesn't change on re-renders
  const velocity = useMemo(
    () => ({
      x: getRandom([75, -75, 30, -30]),
      y: getRandom([300, -300, 600, -600]),
    }),
    []
  )

  // destroy self after 3 seconds
  useEffect(() => {
    if (props.onDestroy) {
      setTimeout(props.onDestroy, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ArcadeImage
      texture="assets"
      frame="ball1"
      velocity={velocity}
      bounce={1}
      collideWorldBounds
      {...props}
    />
  )
}

function getRandom(array: any[]) {
  return array[Math.floor(Math.random() * array.length)]
}

export default Ball
