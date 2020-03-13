import { MatterSensorProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Matter.Components.Sensor
 */
export function applyMatterSensorProps<
  T extends Phaser.Physics.Matter.Components.Sensor
>(instance: T, oldProps: MatterSensorProps, newProps: MatterSensorProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'sensor':
        instance.setSensor(newValue)
        break
    }
  })
}
