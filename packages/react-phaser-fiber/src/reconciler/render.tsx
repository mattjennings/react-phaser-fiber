import React from 'react'
import GameContext from '../components/Game/GameContext'
import { PhaserFiber, injectDevtools } from './reconciler'

// cache root containers
export const roots = new Map()

/**
 * Renders into an existing Phaser.Game without the need for react-dom
 */
export function render(
  element: React.ReactNode,
  game: Phaser.Game,
  // waits for the game to emit a 'ready' event before mounting
  waitForReadyEvent = true,
  callback?: () => any
) {
  let root = roots.get(game)
  if (!root) {
    root = PhaserFiber.createContainer(game, false, false)
    roots.set(game, root)
  }

  if (waitForReadyEvent && !game.isBooted) {
    PhaserFiber.updateContainer(
      <GameContext.Provider value={game}></GameContext.Provider>,
      root,
      undefined,
      callback
    )

    game.events.on('ready', () => {
      PhaserFiber.updateContainer(
        <GameContext.Provider value={game}>{element}</GameContext.Provider>,
        root,
        undefined,
        callback
      )
    })
  } else {
    PhaserFiber.updateContainer(
      <GameContext.Provider value={game}>{element}</GameContext.Provider>,
      root,
      undefined,
      callback
    )
  }

  injectDevtools()

  return PhaserFiber.getPublicRootInstance(root)
}
