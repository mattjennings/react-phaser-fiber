import { iterateProps } from './iterateProps'
import { VisibleProps } from './types'

/**
 * Applies props for Phaser.GameObjects.Components.Visible
 */
export function applyVisibleProps(
  instance: any,
  oldProps: VisibleProps,
  newProps: VisibleProps
) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'visible':
        instance.setVisible(newValue)
        break
    }
  })
}
