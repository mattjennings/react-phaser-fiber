import { CornerValues } from '../../types'
import { iterateProps } from '../../../util/iterateProps'
import isEqual from 'fast-deep-equal'
import { TintProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Tint
 */
export function applyTintProps<T extends Phaser.GameObjects.Components.Tint>(
  instance: T,
  oldProps: TintProps,
  newProps: TintProps
) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
      switch (key) {
        case 'tint':
          if (typeof newValue === 'number') {
            instance.setTint(newValue)
          } else if (!isEqual(newValue, oldValue)) {
            const tintConfig = newValue as CornerValues
            instance.setTint(
              tintConfig.topLeft,
              tintConfig.topRight,
              tintConfig.bottomLeft,
              tintConfig.bottomRight
            )
          }
          break
        case 'tintFill':
          if (typeof newValue === 'number') {
            instance.setTintFill(newValue)
          } else if (!isEqual(newValue, oldValue)) {
            const tintConfig = newValue as CornerValues

            instance.setTintFill(
              tintConfig.topLeft,
              tintConfig.topRight,
              tintConfig.bottomLeft,
              tintConfig.bottomRight
            )
          }
          break
      }
    }
  )
}

function getProps(props: TintProps) {
  const { tint, tintFill } = props

  return {
    tint,
    tintFill,
  }
}
