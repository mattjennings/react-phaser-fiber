import {
  ArcadeSprite,
  ArcadeCollider,
  ArcadeSpriteProps,
  useScene,
  useGameLoop,
} from 'react-phaser-fiber'
import React, { useRef } from 'react'

export interface EnemyProps
  extends Omit<ArcadeSpriteProps, 'texture' | 'frame'> {
  x: number
  y: number
  onDestroy: () => any
}

export default function Enemy({ onDestroy, ...props }: EnemyProps) {
  const ref = useRef<Phaser.Physics.Arcade.Sprite>(null)
  // const scene = useScene()
  // const [xDirection, setXDirection] = useState(1)
  // const [y, setY] = useState(props.y)

  // useGameLoop(() => {
  //   if (ref.current) {
  //     if (ref.current.x > props.x + 200 || ref.current.x < props.x) {
  //       setXDirection(xDirection * -1)
  //       setY(y => y + 32)
  //     }
  //   }
  // })

  return (
    <ArcadeSprite
      ref={ref}
      name="enemy"
      texture="invader"
      animation="enemy/fly"
      isPlaying
      // velocityX={40 * xDirection}
      {...props}
    >
      <ArcadeCollider
        with="player-bullet"
        onCollide={() => {
          onDestroy()
        }}
      />
    </ArcadeSprite>
  )
}
