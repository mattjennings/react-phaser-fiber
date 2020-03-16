import { iterateProps } from '../../util/iterateProps'
import { SpriteProps } from '../../../components'

export function applySpriteProps<T extends Phaser.GameObjects.Sprite>(
  instance: T,
  oldProps: SpriteProps,
  newProps: SpriteProps
) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'onAnimationComplete':
        if (oldValue) {
          instance.off('animationcomplete', oldValue)
        }
        instance.on('animationcomplete', newValue)
        break
    }
  })
}
