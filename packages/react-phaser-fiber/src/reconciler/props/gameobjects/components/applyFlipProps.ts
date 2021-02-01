import { iterateProps } from '../../../util/iterateProps'
import { FlipProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Flip
 */
export function applyFlipProps<T extends Phaser.GameObjects.Components.Flip>(
  instance: T,
  oldProps: FlipProps,
  newProps: FlipProps
) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
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

function getProps(props: FlipProps) {
  const { flipX, flipY } = props

  return {
    flipX,
    flipY,
  }
}
