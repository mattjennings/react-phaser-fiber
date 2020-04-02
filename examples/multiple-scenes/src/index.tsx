import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Text, useScene, Sprite } from 'react-phaser-fiber'

/**
 * This example demonstrates how to toggle between scenes and have a loading screen
 * for both.
 */
const App = () => {
  const [currentScene, setCurrentScene] = useState('a')

  return (
    <Game width={400} height={400}>
      {currentScene === 'a' && <SceneA onChangeScene={setCurrentScene} />}
      {currentScene === 'b' && <SceneB onChangeScene={setCurrentScene} />}
    </Game>
  )
}

const SceneA = ({
  onChangeScene,
}: {
  onChangeScene: (sceneKey: string) => any
}) => (
  <Scene
    sceneKey="scene-a"
    onPreload={scene => {
      scene.load.image('yellow-star', '/assets/yellow-star.png')
    }}
    renderLoading={progress => (
      <Text
        x={100}
        y={100}
        text={`Loading Scene A ${progress}%`}
        style={{ color: 'white' }}
      />
    )}
  >
    <Text
      x={100}
      y={100}
      text="Click to go to Scene B."
      style={{ color: 'white' }}
    />
    <Sprite texture="yellow-star" x={200} y={200} />
    <ClickListener onClick={() => onChangeScene('b')} />
  </Scene>
)

const SceneB = ({
  onChangeScene,
}: {
  onChangeScene: (sceneKey: string) => any
}) => (
  <Scene
    sceneKey="scene-b"
    // we can still preload assets for Scene B
    onPreload={scene => {
      scene.load.image('blue-star', '/assets/blue-star.png')
    }}
    renderLoading={progress => (
      <Text
        x={100}
        y={100}
        text={`Loading Scene B ${progress}%`}
        style={{ color: 'white' }}
      />
    )}
  >
    <Text
      x={100}
      y={100}
      text="Click to go to Scene A."
      style={{ color: 'white' }}
    />
    <Sprite texture="blue-star" x={200} y={200} />
    <ClickListener onClick={() => onChangeScene('a')} />
  </Scene>
)

const ClickListener = ({ onClick }: { onClick: () => any }) => {
  const scene = useScene()

  useEffect(() => {
    scene.input.on('pointerdown', onClick)
  }, [onClick, scene.input])

  return null
}

ReactDOM.render(<App />, document.getElementById('root'))
