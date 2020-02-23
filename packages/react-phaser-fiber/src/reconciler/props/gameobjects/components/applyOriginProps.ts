import { OriginProps } from '../types'
import { iterateProps } from '../../iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.Origin
 */
export function applyOriginProps<
  T extends Phaser.GameObjects.Components.Origin
>(instance: T, oldProps: OriginProps, newProps: OriginProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'originX':
        instance.originX = newValue
        break
      case 'displayOriginY':
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
