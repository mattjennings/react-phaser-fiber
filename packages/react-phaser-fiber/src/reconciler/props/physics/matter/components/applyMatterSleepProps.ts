import { MatterSleepProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.Physics.Matter.Components.Sleep
 */
export function applyMatterSleepProps<
  T extends Phaser.Physics.Matter.Components.Sleep
>(instance: T, oldProps: MatterSleepProps, newProps: MatterSleepProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'sleep':
        if (!isEqual(oldValue, newValue)) {
          const { start, end, threshold } = newValue
          instance.setSleepEvents(start, end)
          instance.setSleepThreshold(threshold)
        }
        break
    }
  })
}
