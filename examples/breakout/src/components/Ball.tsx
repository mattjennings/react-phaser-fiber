import React, { useEffect, useImperativeHandle, useCallback } from 'react'
import {
  ArcadeImageProps,
  GameObject,
  useGameObject,
  useGameLoop,
  ArcadeCollider,
} from 'react-phaser-fiber'

export interface BallProps
  extends Omit<ArcadeImageProps, 'ref' | 'texture' | 'x' | 'y'> {
  paddleRef: React.RefObject<Phaser.Physics.Arcade.Image>
  snapToPaddle: boolean
  onReset: () => void
}

function Ball(
  { paddleRef, snapToPaddle, onReset, ...props }: BallProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  const ball = useGameObject(
    scene => new Phaser.Physics.Arcade.Image(scene, 0, 0, 'assets', 'ball1'),
    {
      physics: 'arcade',
    }
  )

  useImperativeHandle(ref, () => ball)

  useEffect(() => {
    ball.setName('ball')
    ball.setBounce(1)
    ball.setCollideWorldBounds(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useGameLoop(
    useCallback(() => {
      // snap ball to paddle
      if (paddleRef.current && snapToPaddle) {
        ball.setPosition(paddleRef.current.x, paddleRef.current.y - 48)
      }

      // reset when ball leaves bottom of screen
      if (ball.y > 800) {
        ball.setVelocity(0)
        onReset()
      }
    }, [ball, snapToPaddle, onReset, paddleRef])
  )

  return (
    <ArcadeCollider
      for={ball}
      // by using the ref instead of a string, we get types in the onCollide
      with={paddleRef.current as Phaser.Physics.Arcade.Image}
      onCollide={(self, paddle) => {
        // add X velocity to ball when hitting paddle
        if (self.x < paddle.x) {
          const diff = paddle.x - ball.x
          ball.setVelocityX(-10 * diff)
        } else if (ball.x > paddle.x) {
          const diff = ball.x - paddle.x
          ball.setVelocityX(10 * diff)
        } else {
          ball.setVelocityX(2 + Math.random() * 8)
        }
      }}
    >
      <GameObject object={ball} {...props} />
    </ArcadeCollider>
  )
}

export default React.forwardRef(Ball)
