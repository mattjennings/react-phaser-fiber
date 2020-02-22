import { AlphaProps } from './types'
import { iterateProps } from './iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.Transform
 */
export function applyAlphaProps<T extends Phaser.GameObjects.Components.Alpha>(
  instance: T,
  oldProps: AlphaProps,
  newProps: AlphaProps
) {
  const {
    alphaBottomLeft,
    alphaBottomRight,
    alphaTopLeft,
    alphaTopRight,
    ...remainingNewProps
  } = newProps

  iterateProps(oldProps, remainingNewProps, (key, newValue) => {
    switch (key) {
      case 'alpha':
        instance.setAlpha(newValue)
        break
    }
  })

  if (
    alphaBottomLeft !== undefined &&
    alphaBottomLeft !== oldProps.alphaBottomLeft &&
    alphaBottomRight !== undefined &&
    alphaBottomRight !== oldProps.alphaBottomRight &&
    alphaTopLeft !== undefined &&
    alphaTopLeft !== oldProps.alphaTopLeft &&
    alphaTopRight !== undefined &&
    alphaTopRight !== oldProps.alphaTopRight
  ) {
    instance.setAlpha(
      alphaTopLeft,
      alphaTopRight,
      alphaBottomLeft,
      alphaBottomRight
    )
  }
}
