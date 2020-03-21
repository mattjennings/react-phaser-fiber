import { MatterFrictionProps } from '../types'
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
        instance.setFriction(newValue)
        break
      case 'frictionAir':
        instance.setFrictionAir(newValue)
        break
      case 'frictionStatic':
        instance.setFrictionStatic(newValue)
        break
    }
  })
}
