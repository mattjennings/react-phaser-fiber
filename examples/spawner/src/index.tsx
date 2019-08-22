import 'react-app-polyfill/ie11'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Spawner, Text, useScene } from 'react-phaser-fiber'
import BallSpawner from './BallSpawner'

function SpawnerExample() {
  const scene = useScene()

  useEffect(() => {
    scene.physics.world.setBoundsCollision(true, true, true, true)
  }, [scene.physics.world])

  return (
    <Spawner>
      <Text
        x={35}
        y={200}
        style={{ color: 'white' }}
        text="Click anywhere to create a ball that lives for 3 seconds"
      />
      <BallSpawner />
    </Spawner>
  )
}

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
        onPreload={scene => {
          scene.load.atlas(
            'assets',
            'assets/breakout.png',
            'assets/breakout.json'
          )
        }}
        renderLoading={progress => (
          <Text
            x={200}
            y={200}
            text={`Loading... (${progress * 100}%)`}
            style={{ color: 'white' }}
          />
        )}
      >
        <SpawnerExample />
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// @ts-ignore
module.hot.accept()
