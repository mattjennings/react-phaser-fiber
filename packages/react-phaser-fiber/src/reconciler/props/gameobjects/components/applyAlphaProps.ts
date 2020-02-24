import { iterateProps } from '../../iterateProps'
import isEqual from 'fast-deep-equal'
import { AlphaProps } from '../types'
import { CornerValues } from '../../types'

/**
 * Applies props for Phaser.GameObjects.Components.Alpha
 */
export function applyAlphaProps<T extends Phaser.GameObjects.Components.Alpha>(
  instance: T,
  oldProps: AlphaProps,
  newProps: AlphaProps
) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'alpha':
        if (typeof newValue === 'number') {
          instance.setAlpha(newValue)
        } else if (!isEqual(newValue, oldValue)) {
          const alphaConfig = newValue as CornerValues

          instance.setAlpha(
            alphaConfig.topLeft,
            alphaConfig.topRight,
            alphaConfig.bottomLeft,
            alphaConfig.bottomRight
          )
        }
        break
    }
  })
}
