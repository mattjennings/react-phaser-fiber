import { iterateProps } from '../../iterateProps'
import { CropProps } from '../../types'

/**
 * Applies props for Phaser.GameObjects.Components.Crop or Phaser.GameObjects.Components.TextureCrop
 */
export function applyCropProps<
  T extends
    | Phaser.GameObjects.Components.Crop
    | Phaser.GameObjects.Components.TextureCrop
>(instance: T, oldProps: CropProps, newProps: CropProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'crop':
        const asCrop = newValue as {
          x: number
          y: number
          width: number
          height: number
        }

        if (newValue) {
          instance.setCrop(asCrop.x, asCrop.y, asCrop.width, asCrop.height)
        } else {
          // reset crop
          instance.setCrop()
        }
        break
      case 'isCropped':
        instance.isCropped = newValue as boolean
        break
    }
  })
}
