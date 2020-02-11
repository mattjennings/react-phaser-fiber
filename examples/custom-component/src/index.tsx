import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene } from 'react-phaser-fiber'
import Line from './Line'

const App = () => {
  return (
    <Game
      width={400}
      height={400}
      scale={{
        mode: Phaser.Scale.FIT,
      }}
    >
      <Scene sceneKey="main">
        <Line
          from={{ x: 100, y: 100 }}
          to={{ x: 200, y: 200 }}
          color={0xffff00}
        />
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// @ts-ignore
module.hot.accept()
