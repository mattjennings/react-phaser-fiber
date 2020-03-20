import { useSpawner, useInputEvent } from 'react-phaser-fiber'
import Emoji from './Emoji'

const EmojiSpawner: React.FC<{}> = () => {
  const { spawn } = useSpawner()

  useInputEvent('pointerdown', (pointer: Phaser.Input.Pointer) => {
    spawn(Emoji, {
      x: pointer.x,
      y: pointer.y,
    })
  })

  return null
}

export default EmojiSpawner
