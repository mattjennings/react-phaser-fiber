import 'react-app-polyfill/ie11'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Text } from 'react-phaser-fiber'
import Platformer from './Platformer'

const App = () => {
  return (
    <Game
      width={800}
      height={600}
      physics={{
        default: 'arcade',
        arcade: {
          gravity: {
            y: 300,
          },
          // debug: true,
        },
      }}
      scale={{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      }}
    >
      <Scene
        sceneKey="breakout"
        onPreload={scene => {
          scene.load.image('sky', 'sky.png')
          scene.load.image('ground', 'platform.png')
          scene.load.image('star', 'star.png')
          scene.load.spritesheet('dude', 'dude.png', {
            frameWidth: 32,
            frameHeight: 48,
          })
        }}
        renderLoading={progress => (
          <Text
            x={300}
            y={300}
            text={`Loading... (${progress * 100}%)`}
            style={{ color: 'white' }}
          />
        )}
      >
        <Platformer />
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
