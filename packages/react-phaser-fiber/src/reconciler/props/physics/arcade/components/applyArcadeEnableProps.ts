import { ArcadeEnableProps } from '../types'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Enable
 */
export function applyArcadeEnableProps<
  T extends Phaser.Physics.Arcade.Components.Enable
>(instance: T, oldProps: ArcadeEnableProps, newProps: ArcadeEnableProps) {
  const { disableBody } = newProps

  if (!isEqual(oldProps.disableBody, newProps.disableBody)) {
    if (disableBody) {
      if (typeof disableBody === 'boolean') {
        instance.disableBody()
      } else {
        instance.disableBody(
          !!disableBody.disableGameObject,
          !!disableBody.hideGameObject
        )
      }
    } else {
      instance.enableBody(false, 0, 0, true, true)
    }
  }
}
