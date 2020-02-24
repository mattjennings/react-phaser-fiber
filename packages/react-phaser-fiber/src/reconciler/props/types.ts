export type CornerValues = {
  topLeft: number
  topRight: number
  bottomLeft: number
  bottomRight: number
}

export type Point = {
  x: number
  y: number
}

/**
 * Base props for any GameObject
 */
export interface GameObjectProps<T extends Phaser.GameObjects.GameObject> {
  instance: T
  ref?: React.Ref<T>
  name?: string
  active?: boolean
  tabIndex?: number
  data?: any
  renderFlags?: number
  cameraFilter?: number
  ignoreDestroy?: boolean
  interactive?: {
    shape: any
    callback?: Phaser.Types.Input.HitAreaCallback
    dropZone?: boolean
  }
  children?: React.ReactNode
}
