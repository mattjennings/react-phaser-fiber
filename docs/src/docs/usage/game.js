import React from 'react'
import { Canvas, Game, Scene, Text } from 'react-phaser-fiber'

export default function game() {
  return (
    <Game width={400} height={400}>
      <Scene sceneKey="main">
        <Text x={100} y={100} text="Hello World!" style={{ color: 'white' }} />
      </Scene>
    </Game>
  )
}
