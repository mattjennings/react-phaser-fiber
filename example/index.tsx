import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Game, Scene, useGameLoop } from 'react-phaser'

const App = () => {
  return (
    <div>
      <Game width={800} height={800}>
        <Scene sceneKey="main"></Scene>
      </Game>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
