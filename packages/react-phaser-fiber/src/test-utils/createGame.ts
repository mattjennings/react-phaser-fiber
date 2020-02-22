import { wait } from '@testing-library/react'
import Phaser from 'phaser'

export async function createGame(config: Phaser.Types.Core.GameConfig = {}) {
  const game = new Phaser.Game({
    physics: {
      default: 'arcade',
    },
    type: Phaser.HEADLESS,
    banner: false,
    ...config,
  })

  await wait(() => {
    if (!game.isRunning) {
      throw 'Game not ready'
    }
  })

  return game
}
