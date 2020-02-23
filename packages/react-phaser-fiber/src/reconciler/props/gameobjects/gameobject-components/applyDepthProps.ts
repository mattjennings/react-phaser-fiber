import { iterateProps } from '../../iterateProps'
import { DepthProps } from '../../types'

/**
 * Applies props for Phaser.GameObjects.Components.Depth
 */
export function applyDepthProps<T extends Phaser.GameObjects.Components.Depth>(
  instance: T,
  oldProps: DepthProps,
  newProps: DepthProps
) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'depth':
        instance.setDepth(newValue)
        break
    }
  })
}
