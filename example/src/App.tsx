import React from 'react'
import { Game } from 'react-phaser'
import Breakout from './components/Breakout'

const App = () => {
  return (
    <Game width={800} height={800}>
      <Breakout />
    </Game>
  )
}

export default App
