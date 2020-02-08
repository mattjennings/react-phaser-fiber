import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Text, useGameObject } from 'react-phaser-fiber'

const App = () => {
  const [x, setX] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => setX(x => x + 1), 110)

    return () => clearInterval(interval)
  }, [])

  return (
    <Game width={400} height={400}>
      <Scene sceneKey="main">
        {/* <MyObject /> */}
        <Text x={x} y={100} text="Hello World!" style={{ color: 'white' }} />
      </Scene>
    </Game>
  )
}

const MyObject = () => {
  const text = useGameObject(
    scene =>
      new Phaser.GameObjects.Text(scene, 10, 10, 'hello', { color: 'white' })
  )

  return null
}
ReactDOM.render(<App />, document.getElementById('root'))
