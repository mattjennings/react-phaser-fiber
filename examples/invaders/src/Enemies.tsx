import React, { useReducer, useState } from 'react'
import Enemy from './Enemy'
import { useGameLoop, Group } from 'react-phaser-fiber'

export default function Enemies() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <Group name="enemies">
      {state.enemies.map(enemy => (
        <Enemy
          key={enemy.key}
          x={enemy.x}
          y={enemy.y}
          onDestroy={() => dispatch({ type: 'DESTROY', payload: enemy.key })}
        />
      ))}
    </Group>
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
    const rows = 4
    const columns = 10

    return {
      x: 100 + (index % columns) * 48,
      y: 70 + rows * Math.floor(index / columns) * 8,
      key: index,
    }
  }),
}
