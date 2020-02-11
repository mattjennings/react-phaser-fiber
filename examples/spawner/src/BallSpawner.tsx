import { useSpawner, useInputEvent } from 'react-phaser-fiber'
import Ball from './Ball'

const BallSpawner: React.FC<{}> = () => {
  const { spawn } = useSpawner()

  // Spawn a ball at the mouse's position when clicked
  useInputEvent('pointerdown', (pointer: Phaser.Input.Pointer) => {
    spawn(Ball, {
      x: pointer.x,
      y: pointer.y,
    })
  })

  return null
}

export default BallSpawner
