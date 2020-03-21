import React from 'react'
import { Canvas, Game, Scene, Text } from 'react-phaser-fiber'
import ClientSide from './ClientSide'

export default function GameExampleWrapper({ children }) {
  return (
    <ClientSide>
      <Canvas>{children}</Canvas>
    </ClientSide>
  )
}
