import { OriginProps } from '../types'
import { iterateProps } from '../../../util/iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.Origin
 */
export function applyOriginProps<
  T extends Phaser.GameObjects.Components.Origin
>(instance: T, oldProps: OriginProps, newProps: OriginProps) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
    switch (key) {
      case 'originX':
        instance.originX = newValue
        break
      case 'originY':
        instance.originY = newValue
        break
      case 'displayOriginX':
        instance.displayOriginX = newValue
        break
      case 'displayOriginY':
        instance.displayOriginY = newValue
        break
    }
  })
}

function getProps(props: OriginProps) {
  const { originX, originY, displayOriginX, displayOriginY } = props

  return {
    originX,
    originY,
    displayOriginX,
    displayOriginY,
  }
}
