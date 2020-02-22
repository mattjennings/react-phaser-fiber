import { iterateProps } from '../iterateProps'
import { FlipProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Flip
 */
export function applyFlipProps<T extends Phaser.GameObjects.Components.Flip>(
  instance: T,
  oldProps: FlipProps,
  newProps: FlipProps
) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'flipX':
        instance.setFlipX(newValue)
        break
      case 'flipY':
        instance.setFlipY(newValue)
        break
    }
  })
}
