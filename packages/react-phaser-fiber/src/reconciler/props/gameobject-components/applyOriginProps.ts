import { OriginProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Origin
 */
export function applyOriginProps<
  T extends Phaser.GameObjects.Components.Origin
>(instance: T, oldProps: OriginProps, newProps: OriginProps) {
  const { originX, originY, displayOriginX, displayOriginY } = newProps

  if (
    originX !== undefined &&
    originX !== oldProps.originX &&
    originY !== undefined &&
    originY !== oldProps.originY
  ) {
    instance.setOrigin(originX, originY)
  }

  if (
    displayOriginX !== undefined &&
    displayOriginX !== oldProps.displayOriginX &&
    displayOriginY !== undefined &&
    displayOriginY !== oldProps.displayOriginY
  ) {
    instance.setDisplayOrigin(displayOriginX, displayOriginY)
  }
}
