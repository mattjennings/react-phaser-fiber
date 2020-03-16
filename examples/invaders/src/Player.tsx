import {
  ArcadeCollider,
  ArcadeImage,
  useScene,
  useGameLoop,
  useSpawner,
} from 'react-phaser-fiber'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import PlayerBullet from './PlayerBullet'
import { useGameState } from './GameState'

export interface PlayerProps {
  x: number
  y: number
}

const X_SPEED = 200

export default function Player({ x, y }: PlayerProps) {
  const ref = useRef<Phaser.Physics.Arcade.Image>(null)
  const scene = useScene()
  const { spawn } = useSpawner()
  const [velocityX, setVelocityX] = useState(0)
  const { loseLife, lives, gameOver, state } = useGameState()

  const keys = useMemo(
    () => ({
      left: scene.input.keyboard.addKey('left'),
      right: scene.input.keyboard.addKey('right'),
      up: scene.input.keyboard.addKey('up'),
      shoot: scene.input.keyboard.addKey('SPACE'),
    }),
    [scene.input.keyboard]
  )

  function shoot() {
    if (ref.current) {
      spawn(PlayerBullet, {
        x: ref.current.x,
        y: ref.current.y - 8,
        velocityY: -300,
      })
    }
  }

  useGameLoop(() => {
    if (
      (!keys.left.isDown && !keys.right.isDown) ||
      (keys.left.isDown && keys.right.isDown)
    ) {
      setVelocityX(0)
    } else if (keys.left.isDown) {
      setVelocityX(-X_SPEED)
    } else if (keys.right.isDown) {
      setVelocityX(X_SPEED)
    }

    if (Phaser.Input.Keyboard.JustDown(keys.shoot)) {
      shoot()
    }
  })

  useEffect(() => {
    if (lives < 0) {
      gameOver()
    }
  }, [gameOver, lives])

  return (
    <ArcadeImage
      ref={ref}
      depth={10}
      name="player"
      texture="textures/player"
      x={x}
      y={y}
      velocityX={velocityX}
      collideWorldBounds
    >
      <ArcadeCollider
        with={['enemies', 'enemyBullet']}
        overlapOnly
        onCollide={() => {
          if (state === 'playing') {
            loseLife()
          }
        }}
      />
    </ArcadeImage>
  )
}
