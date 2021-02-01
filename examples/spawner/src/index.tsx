import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Spawner, Text } from 'react-phaser-fiber'
import BallSpawner from './BallSpawner'

const App = () => {
  return (
    <Game
      width={600}
      height={600}
      physics={{
        default: 'arcade',
      }}
      scale={{
        mode: Phaser.Scale.FIT,
      }}
    >
      <Scene
        sceneKey="main"
        onPreload={(scene) => {
          scene.load.atlas(
            'assets',
            'assets/breakout.png',
            'assets/breakout.json'
          )
        }}
        onCreate={(scene) => {
          scene.physics.world.setBoundsCollision(true, true, true, true)
        }}
        renderLoading={(progress) => (
          <Text
            x={200}
            y={200}
            text={`Loading... (${progress * 100}%)`}
            color="white"
          />
        )}
      >
        <Spawner>
          <Text
            x={35}
            y={200}
            color="white"
            text="Click anywhere to create a ball that lives for 3 seconds"
          />
          <BallSpawner />
        </Spawner>
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
