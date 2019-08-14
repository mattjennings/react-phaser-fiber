import 'react-app-polyfill/ie11'
import * as Phaser from 'phaser'
import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Text, Scene } from 'react-phaser'

const App = () => {
  const [value, setValue] = React.useState('this is a test')
  return (
    <div>
      <input value={value} onChange={e => setValue(e.currentTarget.value)} />
      <Game width={800} height={800}>
        <Scene sceneKey="main">
          <Text x={0} y={0} text={value} style={{ color: 'white' }} />
        </Scene>
      </Game>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
