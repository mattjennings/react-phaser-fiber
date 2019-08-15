import React, { useState } from 'react'
import 'react-app-polyfill/ie11'
import ReactDOM from 'react-dom'
import { Game, Scene, Text } from 'react-phaser'
import Paddle from './components/Paddle'
import { SceneProps } from 'react-phaser/dist/components/Scene'
import Block from './components/Block'

const App = () => {
  return (
    <Game width={800} height={800}>
      <MainScene
        loadingFallback={progress => (
          <Text
            x={400}
            y={400}
            text={`Loading... (${progress * 100}%)`}
            style={{ color: 'white' }}
          />
        )}
      />
    </Game>
  )
}

const MainScene = (props: Partial<SceneProps>) => {
  const [blocks, setBlocks] = useState(
    Array.from({ length: 60 }).map((_, index) => ({
      x: (index % 10) * 64,
      y: 10 * Math.floor(index / 10) * 3.2,
    }))
  )

  return (
    <Scene
      sceneKey="main"
      onPreload={scene => {
        scene.load.atlas(
          'assets',
          'assets/breakout.png',
          'assets/breakout.json'
        )
      }}
      {...props}
    >
      <>
        {blocks.map((block, index) => (
          <Block key={index} x={block.x + 116} y={block.y + 200} />
        ))}
        <Paddle initialX={400} initialY={700} />
      </>
    </Scene>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
