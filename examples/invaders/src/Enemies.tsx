import React, { useRef, useState, useEffect } from 'react'
import { ArcadeGroup, useScene, useSpawner, useTimer } from 'react-phaser-fiber'
import Enemy from './Enemy'
import EnemyBullet from './EnemyBullet'
import { useGameState } from './GameState'

export default function Enemies() {
  const ref = useRef<Phaser.Physics.Arcade.Group>(null)
  const scene = useScene()
  const { spawn } = useSpawner()
  const { addScore, gameOver, state, win } = useGameState()
  const [velocityX, setVelocityX] = useState(40)

  const [y, setY] = useState(70)
  const [enemies, setEnemies] = useState(
    Array.from({ length: 40 }).map((_, index) => {
      const columns = 10
      const column = index % columns
      const row = Math.floor(index / columns)

      return {
        x: column * 52,
        y: row * 32,
        key: index,
      }
    })
  )

  // move enemies left & right
  useTimer(
    () => {
      setVelocityX(prev => -prev)

      setY(y => y + 16)
    },
    3500,
    { loop: true, paused: state !== 'playing' }
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
    { loop: true, paused: state !== 'playing' }
  )

  useEffect(() => {
    if (enemies.length === 0 && state !== 'win') {
      win()
    }
  }, [enemies, state, win])

  return (
    <ArcadeGroup
      ref={ref}
      name="enemies"
      velocityX={state === 'playing' ? velocityX : 0}
    >
      {enemies.map(enemy => (
        <Enemy
          key={enemy.key}
          x={100 + enemy.x}
          y={y + enemy.y}
          onDestroy={() => {
            addScore(100)
            setEnemies(enemies => enemies.filter(e => e !== enemy))
          }}
          onExitedWorld={gameOver}
        />
      ))}
    </ArcadeGroup>
  )
}
