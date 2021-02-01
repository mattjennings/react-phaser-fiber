import { ArcadeDebugProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Debug
 */
export function applyArcadeDebugProps<
  T extends Phaser.Physics.Arcade.Components.Debug
>(instance: T, oldProps: ArcadeDebugProps, newProps: ArcadeDebugProps) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
      switch (key) {
        case 'debug':
          if (!isEqual(newValue, oldValue)) {
            const {
              showBody = false,
              showVelocity = false,
              bodyColor,
            } = newValue
            instance.debugBodyColor = bodyColor
            instance.debugShowBody = showBody
            instance.debugShowVelocity = showVelocity
          }
          break
      }
    }
  )
}

function getProps(props: ArcadeDebugProps) {
  const { debug } = props

  return {
    debug,
  }
}
