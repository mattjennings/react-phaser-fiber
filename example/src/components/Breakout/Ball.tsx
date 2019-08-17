import React from 'react'
import { ArcadeImage, ArcadeImageProps, useArcadeCollider } from 'react-phaser'
import { useCallback } from 'react'

export interface BallProps
  extends Omit<ArcadeImageProps, 'ref' | 'texture' | 'x' | 'y'> {
  paddleRef: React.RefObject<Phaser.Physics.Arcade.Image>
}

function Ball(
  { paddleRef, ...props }: BallProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  const ballRef = ref as React.RefObject<Phaser.Physics.Arcade.Image>

  // collide with paddle
  useArcadeCollider(
    ballRef,
    paddleRef,
    useCallback((ball, paddle) => {
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
    }, [])
  )

  return (
    <ArcadeImage
      ref={ref}
      x={0} // ball position will be controlled its velocity once set
      y={0}
      texture="assets"
      frame="ball1"
      {...props}
    />
  )
}

export default React.forwardRef(Ball)
