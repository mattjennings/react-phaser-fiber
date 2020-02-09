import React, { useImperativeHandle, useEffect } from 'react'
import {
  ArcadeImageProps,
  useArcadeCollider,
  useGameObject,
  GameObject,
} from 'react-phaser-fiber'
import { useCallback } from 'react'

export interface BallProps
  extends Omit<ArcadeImageProps, 'ref' | 'texture' | 'x' | 'y'> {}

function Ball(
  { ...props }: BallProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  const ball = useGameObject(
    scene => new Phaser.Physics.Arcade.Image(scene, 0, 0, 'assets', 'ball1')
  )

  useEffect(() => {
    ball.setName('ball')
    ball.setBounce(1)
    ball.setCollideWorldBounds(true)
  }, [ball])

  useImperativeHandle(ref, () => ball)

  // collide with paddle
  // useArcadeCollider(
  //   ball,
  //   paddleRef.current,
  //   useCallback((ball, paddle) => {
  // // add X velocity to ball when hitting paddle
  // if (ball.x < paddle.x) {
  //   const diff = paddle.x - ball.x
  //   ball.setVelocityX(-10 * diff)
  // } else if (ball.x > paddle.x) {
  //   const diff = ball.x - paddle.x
  //   ball.setVelocityX(10 * diff)
  // } else {
  //   ball.setVelocityX(2 + Math.random() * 8)
  // }
  //   }, [])
  // )

  return <GameObject object={ball} {...props} />
}

export default React.forwardRef(Ball)
