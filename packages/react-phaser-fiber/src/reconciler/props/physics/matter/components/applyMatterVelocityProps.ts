import { MatterVelocityProps } from '../types'
import isEqual from 'fast-deep-equal'
import { iterateProps } from '../../../../util/iterateProps'
import { Point } from '../../../types'

/**
 * Applies props for Phaser.Physics.Matter.Components.Velocity
 */
export function applyMatterVelocityProps<
  T extends Phaser.Physics.Matter.Components.Velocity
>(instance: T, oldProps: MatterVelocityProps, newProps: MatterVelocityProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'velocity':
        if (typeof newValue === 'number') {
          instance.setVelocity(newValue)
        } else if (!isEqual(newValue, oldValue)) {
          const { x, y } = newValue as Point
          instance.setVelocity(x, y)
        }
        break
      case 'angularVelocity':
        instance.setAngularVelocity(newValue as number)
        break
      case 'velocityX':
        instance.setVelocityX(newValue as number)
        break
      case 'velocityY':
        instance.setVelocityY(newValue as number)
        break
    }
  })
}
