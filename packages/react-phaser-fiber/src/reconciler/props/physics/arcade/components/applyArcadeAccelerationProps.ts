import { ArcadeAccelerationProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Acceleration
 */
export function applyArcadeAccelerationProps<
  T extends Phaser.Physics.Arcade.Components.Acceleration
>(
  instance: T,
  oldProps: ArcadeAccelerationProps,
  newProps: ArcadeAccelerationProps
) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'acceleration':
        if (typeof newValue === 'number') {
          instance.setAcceleration(newValue as number)
        } else if (!isEqual(oldValue, newValue)) {
          instance.setAcceleration(newValue.x, newValue.y)
        }
        break
      case 'accelerationX':
        instance.setAccelerationX(newValue as number)
        break
      case 'accelerationY':
        instance.setAccelerationY(newValue as number)
        break
    }
  })
}
