import { iterateProps } from '../../util/iterateProps'
import { SpriteProps } from '../../../components'

export function applySpriteProps<T extends Phaser.GameObjects.Sprite>(
  instance: T,
  oldProps: SpriteProps,
  newProps: SpriteProps
) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
      switch (key) {
        case 'onAnimationComplete':
          if (oldValue) {
            instance.off('animationcomplete', oldValue)
          }
          instance.on('animationcomplete', newValue)
          break
      }
    }
  )
}

function getProps(props: SpriteProps) {
  const { onAnimationComplete } = props

  return {
    onAnimationComplete,
  }
}
