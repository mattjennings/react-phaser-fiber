import React, { useReducer, useState } from 'react'
import { ArcadeGroup, useTimer } from 'react-phaser-fiber'
import Enemy from './Enemy'

export default function Enemies() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [velocityX, setVelocityX] = useState(40)
  const [y, setY] = useState(70)

  useTimer(
    () => {
      setVelocityX(prev => -prev)
      setY(y => y + 16)
    },
    4500,
    { loop: true }
  )

  return (
    <ArcadeGroup velocityX={velocityX}>
      {state.enemies.map(enemy => (
        <Enemy
          key={enemy.key}
          x={100 + enemy.x}
          y={y + enemy.y}
          onDestroy={() => dispatch({ type: 'DESTROY', payload: enemy.key })}
        />
      ))}
    </ArcadeGroup>
  )
}

interface EnemiesState {
  enemies: Array<{ x: number; y: number; key: number }>
}

function reducer(state: EnemiesState, action: { payload: any; type: string }) {
  return state
}

const defaultState: EnemiesState = {
  enemies: Array.from({ length: 40 }).map((_, index) => {
    const columns = 10
    const column = index % columns
    const row = Math.floor(index / columns)

    return {
      x: column * 48,
      y: row * 24,
      key: index,
    }
  }),
}
