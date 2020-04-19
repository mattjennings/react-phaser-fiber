import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Text } from 'react-phaser-fiber'

const App = () => {
  return (
    <Game width={400} height={400}>
      <Scene sceneKey="main">
        <Text x={100} y={100} text="Hello World!" color="white" />
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
