import invariant from 'fbjs/lib/invariant'
import * as Phaser from 'phaser'
import { PhaserFiber } from '../reconciler'

// cache root containers
export const roots = new Map()

export default function render(
  element: any,
  game: Phaser.Game,
  callback?: () => void | null | undefined
) {
  invariant(
    Phaser.Game.prototype.isPrototypeOf(game),
    'Invalid argument `game`, expected instance of `Phaser.Game`.'
  )

  let root = roots.get(game)
  if (!root) {
    // get the flushed fiber container
    root = PhaserFiber.createContainer(game, false, false)
    roots.set(game, root)
  }

  // schedules a top level update
  PhaserFiber.updateContainer(element, root, undefined, callback as any)

  // return the root instance
  return PhaserFiber.getPublicRootInstance(root)
}
