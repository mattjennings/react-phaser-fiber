import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Text } from 'react-phaser-fiber'
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
      <Scene
        sceneKey="breakout"
        onPreload={scene => {
          scene.load.atlas(
            'assets',
            'assets/breakout.png',
            'assets/breakout.json'
          )
        }}
        renderLoading={progress => (
          <Text
            x={300}
            y={400}
            text={`Loading... (${progress * 100}%)`}
            style={{ color: 'white' }}
          />
        )}
      >
        <Breakout />
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
