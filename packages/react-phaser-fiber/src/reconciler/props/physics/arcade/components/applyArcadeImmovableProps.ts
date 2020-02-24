import { ArcadeImmovableProps } from '../types'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Immovable
 */
export function applyArcadeImmovableProps<
  T extends Phaser.Physics.Arcade.Components.Immovable
>(instance: T, oldProps: ArcadeImmovableProps, newProps: ArcadeImmovableProps) {
  const { immovable } = newProps

  if (immovable !== oldProps.immovable) {
    instance.setImmovable(immovable)
  }
}
