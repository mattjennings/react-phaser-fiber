import { iterateProps } from '../../../util/iterateProps'
import { MaskProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Mask
 */
export function applyMaskProps<T extends Phaser.GameObjects.Components.Mask>(
  instance: T,
  oldProps: MaskProps,
  newProps: MaskProps
) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
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

function getProps(props: MaskProps) {
  const { mask } = props

  return {
    mask,
  }
}
