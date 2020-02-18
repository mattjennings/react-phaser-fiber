import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene } from 'react-phaser-fiber'
import Background from './Background'

const App = () => {
  return (
    <Game
      width={800}
      height={600}
      scale={{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      }}
    >
      <Scene
        sceneKey="main"
        onPreload={scene => {
          scene.load.image('starfield', 'starfield.png')
        }}
      >
        <Background />
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
