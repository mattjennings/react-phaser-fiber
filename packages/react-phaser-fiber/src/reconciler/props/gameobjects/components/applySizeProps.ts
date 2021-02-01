import { SizeProps } from '../types'
import { iterateProps } from '../../../util/iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.Size or Phaser.GameObjects.Components.ComputedSize
 */
export function applySizeProps<
  T extends
    | Phaser.GameObjects.Components.ComputedSize
    | Phaser.GameObjects.Components.Size
>(instance: T, oldProps: SizeProps, newProps: SizeProps) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
    switch (key) {
      case 'width':
        instance.width = newValue as number
        break
      case 'height':
        instance.height = newValue as number
        break
      case 'displayWidth':
        instance.displayWidth = newValue as number
        break
      case 'displayHeight':
        instance.displayHeight = newValue as number
        break
      case 'setSizeToFrame':
        ;(instance as Phaser.GameObjects.Components.Size).setSizeToFrame(
          newValue as Phaser.Textures.Frame
        )
        break
    }
  })
}

function getProps(props: SizeProps) {
  const { width, height, displayWidth, displayHeight, setSizeToFrame } = props

  return {
    width,
    height,
    displayWidth,
    displayHeight,
    setSizeToFrame,
  }
}
