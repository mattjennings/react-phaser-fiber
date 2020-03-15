import React, { useReducer, useRef, useState } from 'react'
import { ArcadeGroup, useTimer, useSpawner, useScene } from 'react-phaser-fiber'
import Enemy from './Enemy'
import EnemyBullet from './EnemyBullet'

export default function Enemies({
  onExitedWorld,
}: {
  onExitedWorld: () => any
}) {
  const ref = useRef<Phaser.Physics.Arcade.Group>(null)
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [velocityX, setVelocityX] = useState(40)
  const [y, setY] = useState(70)
  const { spawn } = useSpawner()
  const scene = useScene()

  // move enemies left & right
  useTimer(
    () => {
      setVelocityX(prev => -prev)
      setY(y => y + 16)
    },
    3500,
    { loop: true }
  )

  // shoot bullets from a random enemy
  useTimer(
    () => {
      const player = scene.children.getByName(
        'player'
      ) as Phaser.Physics.Arcade.Sprite
      const enemies = scene.children.list.filter(
        child => child.name === 'enemy'
      )

      // get the gameobject reference of a random enemy
      const enemy = enemies[
        Phaser.Math.RND.integerInRange(0, enemies.length - 1)
      ] as Phaser.Physics.Arcade.Sprite

      if (player && enemy) {
        // get angle from enemy to player
        const angle =
          (Math.atan2(player.y - enemy.y, player.x - enemy.x) * 180) / Math.PI

        const velocity = scene.physics.velocityFromAngle(angle, 180)

        spawn(EnemyBullet, {
          x: enemy.x,
          y: enemy.y,
          angle,
          velocity,
        })
      }
    },
    2000,
    { loop: true }
  )

  return (
    <ArcadeGroup ref={ref} name="enemies" velocityX={velocityX}>
      {state.enemies.map(enemy => (
        <Enemy
          key={enemy.key}
          x={100 + enemy.x}
          y={y + enemy.y}
          onDestroy={() => dispatch({ type: 'ENEMY_HIT', payload: enemy.key })}
          onExitedWorld={onExitedWorld}
        />
      ))}
    </ArcadeGroup>
  )
}

interface EnemiesState {
  enemies: Array<{ x: number; y: number; key: number }>
}

function reducer(
  state: EnemiesState,
  action: { payload?: any; type: string }
): EnemiesState {
  switch (action.type) {
    case 'ENEMY_HIT': {
      return {
        ...state,
        enemies: state.enemies.filter(({ key }) => key !== action.payload),
      }
    }

    default:
      return state
  }
}

const defaultState: EnemiesState = {
  enemies: Array.from({ length: 40 }).map((_, index) => {
    const columns = 10
    const column = index % columns
    const row = Math.floor(index / columns)

    return {
      x: column * 52,
      y: row * 32,
      key: index,
    }
  }),
}
