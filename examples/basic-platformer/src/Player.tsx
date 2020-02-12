import React, { useMemo, useState } from 'react'
import {
  ArcadeSprite,
  ArcadeCollider,
  useScene,
  useKeyboardEvent,
  useGameLoop,
} from 'react-phaser-fiber'

export default function Player(props: { x: number; y: number }) {
  const scene = useScene()
  const { keyboard } = scene.input

  const keys = useMemo(
    () => ({
      left: scene.input.keyboard.addKey('left'),
      right: scene.input.keyboard.addKey('right'),
      up: scene.input.keyboard.addKey('up'),
    }),
    []
  )

  const [velocityX, setVelocityX] = useState(0)
  const [velocityY, setVelocityY] = useState(0)
  const [animation, setAnimation] = useState('turn')

  const animations = useMemo<Phaser.Types.Animations.Animation[]>(
    () => [
      {
        key: 'left',
        frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      },
      {
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20,
      },
      {
        key: 'right',
        frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      },
    ],
    []
  )

  useGameLoop(() => {
    if (keys.left.isDown) {
      setVelocityX(-160)
      setAnimation('left')
    } else if (keys.right.isDown) {
      setVelocityX(160)
      setAnimation('right')
    } else {
      setVelocityX(0)
      setAnimation('turn')
    }
  })

  return (
    <ArcadeSprite
      {...props}
      ref={r => {
        console.log(r)
      }}
      name="player"
      animations={animations}
      animation={animation}
      texture="dude"
      bounce={0.2}
      collideWorldBounds
      velocity={{
        x: velocityX,
        y: velocityY,
      }}
    >
      <ArcadeCollider with="platform" />
    </ArcadeSprite>
  )
}
