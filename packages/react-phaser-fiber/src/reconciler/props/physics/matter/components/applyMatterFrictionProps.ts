import { MatterFrictionProps } from '../types'
import isEqual from 'fast-deep-equal'
import { iterateProps } from '../../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Matter.Components.Friction
 */
export function applyMatterFrictionProps<
  T extends Phaser.Physics.Matter.Components.Friction
>(instance: T, oldProps: MatterFrictionProps, newProps: MatterFrictionProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'friction':
        if (typeof newValue === 'number') {
          instance.setFriction(newValue)
        } else if (!isEqual(newValue, oldValue)) {
          const { value, air, fstatic } = newValue
          instance.setFriction(value, air, fstatic)
        }
        break
      case 'frictionAir':
        instance.setFrictionAir(newValue as number)
        break
      case 'frictionStatic':
        instance.setFrictionStatic(newValue as number)
        break
    }
  })
}
