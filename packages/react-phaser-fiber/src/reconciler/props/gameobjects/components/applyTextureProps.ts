import { TextureProps } from '../types'
import { iterateProps } from '../../../util/iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.Texture
 */
export function applyTextureProps<
  T extends Phaser.GameObjects.Components.Texture
>(instance: T, oldProps: TextureProps, newProps: TextureProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'texture':
        instance.setTexture(newValue as string)
        break
      case 'frame':
        instance.setFrame(newValue as string, true, true)
        break
    }
  })
}
