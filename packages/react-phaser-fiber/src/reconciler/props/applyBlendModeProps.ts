import { iterateProps } from './iterateProps'
import { BlendModeProps } from './types'

/**
 * Applies props for Phaser.GameObjects.Components.BlendMode
 */
export function applyBlendModeProps<
  T extends Phaser.GameObjects.Components.BlendMode
>(instance: T, oldProps: BlendModeProps, newProps: BlendModeProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'blendMode':
        instance.setBlendMode(newValue)
        break
    }
  })
}
