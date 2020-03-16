import React, { useState } from 'react'
import { TileSprite, useGameLoop } from 'react-phaser-fiber'

export default function Background() {
  const [yOffset, setYOffset] = useState(0)

  useGameLoop(() => {
    setYOffset(y => y - 2)
  })

  return (
    <TileSprite
      depth={-1}
      x={0}
      y={0}
      width={800}
      height={600}
      originX={0}
      originY={0}
      texture="textures/starfield"
      tilePositionY={yOffset}
    />
  )
}
