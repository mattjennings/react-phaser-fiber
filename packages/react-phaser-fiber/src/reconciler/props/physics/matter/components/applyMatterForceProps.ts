import { MatterForceProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.Physics.Matter.Components.Force
 */
export function applyMatterForceProps<
  T extends Phaser.Physics.Matter.Components.Force
>(instance: T, oldProps: MatterForceProps, newProps: MatterForceProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'force':
        if (!isEqual(oldValue, newValue)) {
          instance.applyForce(newValue as Phaser.Math.Vector2)
        }
        break
      case 'forceFrom':
        // TODO
        break
      case 'thrust':
        instance.thrust(newValue as number)
        break
      case 'thrustBack':
        instance.thrustBack(newValue as number)
        break
      case 'thrustLeft':
        instance.thrustLeft(newValue as number)
        break
      case 'thrustRight':
        instance.thrustRight(newValue as number)
        break
    }
  })
}
