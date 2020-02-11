import React, { useCallback, useImperativeHandle, useMemo } from 'react'
import {
  ArcadeCollider,
  ArcadeImageProps,
  GameObject,
  useGameLoop,
  useScene,
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
  const scene = useScene()
  const ball = useMemo(
    () => new Phaser.Physics.Arcade.Image(scene, 0, 0, 'assets', 'ball1'),
    [scene]
  )

  useImperativeHandle(ref, () => ball)

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
    <GameObject
      instance={ball}
      name="ball"
      bounce={1}
      collideWorldBounds
      physics="arcade"
      {...props}
    >
      <ArcadeCollider
        with="paddle"
        onCollide={(self, paddle: Phaser.Physics.Arcade.Image) => {
          // add X velocity to ball when hitting paddle
          if (ball.x < paddle.x) {
            const diff = paddle.x - ball.x
            ball.setVelocityX(-10 * diff)
          } else if (ball.x > paddle.x) {
            const diff = ball.x - paddle.x
            ball.setVelocityX(10 * diff)
          } else {
            ball.setVelocityX(2 + Math.random() * 8)
          }
        }}
      />
    </GameObject>
  )
}

export default React.forwardRef(Ball)
