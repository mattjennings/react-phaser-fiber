import React from 'react'
import 'react-app-polyfill/ie11'
import ReactDOM from 'react-dom'
import { Game } from 'react-phaser'
import Breakout from './components/Breakout'

const App = () => {
  return (
    <Game width={800} height={800}>
      <Breakout />
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
