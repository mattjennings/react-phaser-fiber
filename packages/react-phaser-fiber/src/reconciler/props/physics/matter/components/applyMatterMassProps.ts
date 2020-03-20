import { MatterMassProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Matter.Components.Mass
 */
export function applyMatterMassProps<
  T extends Phaser.Physics.Matter.Components.Mass
>(instance: T, oldProps: MatterMassProps, newProps: MatterMassProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'mass':
        instance.setMass(newValue)
        break
      case 'density':
        instance.setDensity(newValue)
        break
    }
  })
}
