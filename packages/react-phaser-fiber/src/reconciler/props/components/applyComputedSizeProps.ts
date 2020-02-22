import { ComputedSizeProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.ComputedSize
 */
export function applyComputedSizeProps<
  T extends Phaser.GameObjects.Components.ComputedSize
>(instance: T, oldProps: ComputedSizeProps, newProps: ComputedSizeProps) {
  const { width, height, displayWidth, displayHeight } = newProps

  if (
    width !== undefined &&
    width !== oldProps.width &&
    height !== undefined &&
    height !== oldProps.height
  ) {
    instance.setSize(width, height)
  }
  if (
    displayWidth !== undefined &&
    displayWidth !== oldProps.displayWidth &&
    displayHeight !== undefined &&
    displayHeight !== oldProps.displayHeight
  ) {
    instance.setDisplaySize(displayWidth, displayHeight)
  }
}
