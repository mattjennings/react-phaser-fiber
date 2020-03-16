import React from 'react'
import { Text, useInputEvent } from 'react-phaser-fiber'
import { useGameState } from './GameState'

export default function UI() {
  const { score, lives, state, reset } = useGameState()
  const style = { color: 'white' }

  useInputEvent('pointerdown', () => {
    if (state === 'gameover' || state === 'win') {
      reset()
    }
  })

  return (
    <>
      <Text x={16} y={16} text={`Score: ${score}`} style={style} />
      <Text x={700} y={16} text={`Lives: ${lives}`} style={style} />
      {state !== 'playing' && (
        <>
          <Text
            x={250}
            y={200}
            text={state === 'gameover' ? 'Game Over' : 'You Win!'}
            style={{
              color: 'white',
              fontSize: '48px',
              align: 'center',
            }}
          />
          <Text
            x={280}
            y={265}
            text="Click to restart"
            style={{
              color: 'white',
              fontSize: '20px',
            }}
          />
        </>
      )}
      <Text
        x={180}
        y={575}
        text="Move with arrow keys, shoot with spacebar"
        style={style}
      />
    </>
  )
}
