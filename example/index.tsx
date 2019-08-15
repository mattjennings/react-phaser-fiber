import 'react-app-polyfill/ie11'
import * as Phaser from 'phaser'
import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { Game, Text, Scene, useInputEvent } from 'react-phaser'
import Line from './Line'

const App = () => {
  const [value, setValue] = React.useState(
    'this uses react state from a DOM input'
  )

  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        style={{ width: 500 }}
      />
      <Game width={800} height={800}>
        <MainScene text={value} />
      </Game>
    </div>
  )
}

const MainScene = ({ text }: { text: string }) => {
  return (
    <Scene sceneKey="main">
      <Text x={0} y={0} text={text} style={{ color: 'white' }} />
      <Line
        from={{
          x: 100,
          y: 100,
        }}
        to={{
          x: 100,
          y: 500,
        }}
        color={0xffff00}
      />
      <MovingText />
    </Scene>
  )
}

const MovingText = () => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const updatePosition = useCallback((pointer: Phaser.Input.Pointer) => {
    setPointer({ x: pointer.x, y: pointer.y })
  }, [])

  useInputEvent('pointermove', updatePosition)

  return (
    <Text
      x={pointer.x}
      y={pointer.y}
      text={'following your mouse'}
      style={{ color: 'white' }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
