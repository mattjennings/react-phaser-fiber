import { ArcadeSizeProps } from '../types'
import isEqual from 'fast-deep-equal'
import { iterateProps } from '../../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Size
 */
export function applyArcadeSizeProps<
  T extends Phaser.Physics.Arcade.Components.Size
>(instance: T, oldProps: ArcadeSizeProps, newProps: ArcadeSizeProps) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
      switch (key) {
        case 'size':
          if (!isEqual(newValue, oldValue)) {
            const {
              width,
              height,
              center,
            } = newValue as ArcadeSizeProps['size']

            instance.setSize(
              width,
              height,
              // @ts-ignore - this parameter does exist despite wrong typescript defs
              center
            )
          }

          break
        case 'circle':
          if (!isEqual(newValue, oldValue)) {
            const {
              radius,
              offsetX,
              offsetY,
            } = newValue as ArcadeSizeProps['circle']

            instance.setCircle(radius, offsetX, offsetY)
          }
          break
        case 'offset':
          if (!isEqual(newValue, oldValue)) {
            const { x, y } = newValue as ArcadeSizeProps['offset']
            instance.setOffset(x, y)
          }
          break
      }
    }
  )
}

function getProps(props: ArcadeSizeProps) {
  const { size, circle, offset } = props

  return {
    size,
    circle,
    offset,
  }
}
