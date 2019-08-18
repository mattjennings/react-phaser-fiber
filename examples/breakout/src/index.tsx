import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(<App />, document.getElementById('root'))

// @ts-ignore
module.hot.accept()
