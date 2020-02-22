import { ComputedSizeProps } from '../types'
import { iterateProps } from '../iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.ComputedSize
 */
export function applyComputedSizeProps<
  T extends Phaser.GameObjects.Components.ComputedSize
>(instance: T, oldProps: ComputedSizeProps, newProps: ComputedSizeProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'width':
        instance.width = newValue
        break
      case 'height':
        instance.height = newValue
        break
      case 'displayWidth':
        instance.displayWidth = newValue
        break
      case 'displayHeight':
        instance.displayHeight = newValue
        break
    }
  })
}
