import { ArcadeMassProps } from '../types'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Mass
 */
export function applyArcadeMassProps<
  T extends Phaser.Physics.Arcade.Components.Mass
>(instance: T, oldProps: ArcadeMassProps, newProps: ArcadeMassProps) {
  const { mass } = newProps

  if (mass !== oldProps.mass) {
    instance.setMass(mass)
  }
}
