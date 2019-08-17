import React from 'react'
import { Game } from 'react-phaser-fiber'
import Breakout from './components/Breakout'

const App = () => {
  return (
    <Game
      width={800}
      height={800}
      physics={{
        default: 'arcade',
      }}
      scale={{
        mode: Phaser.Scale.FIT,
      }}
    >
      <Breakout />
    </Game>
  )
}

export default App
