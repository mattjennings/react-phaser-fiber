import { iterateProps } from '../../iterateProps'
import { ScrollFactorProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.ScrollFactor
 */
export function applyScrollFactorProps<
  T extends Phaser.GameObjects.Components.ScrollFactor
>(instance: T, oldProps: ScrollFactorProps, newProps: ScrollFactorProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'scrollFactorX':
        instance.scrollFactorX = newValue
        break
      case 'scrollFactorY':
        instance.scrollFactorY = newValue
        break
    }
  })
}
