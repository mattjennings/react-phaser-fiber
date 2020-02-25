import React, {
  useReducer,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react'
import Enemy from './Enemy'
import { useGameLoop, Group, useScene, ArcadeGroup } from 'react-phaser-fiber'

export default function Enemies() {
  const groupRef = useRef<Phaser.Physics.Arcade.Group>(null)
  const [state, dispatch] = useReducer(reducer, defaultState)

  const scene = useScene()
  const [xDirection, setXDirection] = useState(1)
  const [y, setY] = useState(20)

  useGameLoop(() => {
    if (groupRef.current) {
      // if (groupRef.current > 400 || groupRef.current.x < 200) {
      // setXDirection(xDirection * -1)
      // setY(y => y + 32)
      // }
    }
  })

  // useEffect(() => {
  //   setInterval(() => {
  //     setXDirection(xDirection * -1)
  //     // setY(y => y + 32)
  //   }, 3000)
  // }, [xDirection])
  return (
    <ArcadeGroup name="enemies" ref={groupRef} velocityX={40 * xDirection}>
      {state.enemies.map(enemy => (
        <Enemy
          key={enemy.key}
          x={enemy.x}
          y={enemy.y + y}
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
    const rows = 4
    const columns = 10

    return {
      x: 100 + (index % columns) * 48,
      y: 70 + rows * Math.floor(index / columns) * 8,
      key: index,
    }
  }),
}
