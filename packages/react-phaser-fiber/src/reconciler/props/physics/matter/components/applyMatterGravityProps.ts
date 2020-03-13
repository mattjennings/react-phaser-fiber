import { MatterGravityProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Matter.Components.Gravity
 */
export function applyMatterGravityProps<
  T extends Phaser.Physics.Matter.Components.Gravity
>(instance: T, oldProps: MatterGravityProps, newProps: MatterGravityProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'ignoreGravity':
        instance.setIgnoreGravity(newValue)
        break
    }
  })
}
