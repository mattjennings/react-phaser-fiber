import { iterateProps } from '../../iterateProps'
import { MaskProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Mask
 */
export function applyMaskProps<T extends Phaser.GameObjects.Components.Mask>(
  instance: T,
  oldProps: MaskProps,
  newProps: MaskProps
) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'mask':
        if (newValue) {
          instance.setMask(newValue)
        } else {
          instance.clearMask()
        }
        break
    }
  })
}
