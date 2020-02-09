import { applyProps } from '../utils/applyProps'
import { CreatePhaserComponentConfig } from '../utils/element'

export interface GameObjectProps<T extends Phaser.GameObjects.GameObject> {
  object: T
  ref?: React.RefObject<Phaser.GameObjects.GameObject>
}

export type AlphaProps = Partial<
  Pick<
    Phaser.GameObjects.Components.Alpha,
    | 'alpha'
    | 'alphaBottomLeft'
    | 'alphaBottomRight'
    | 'alphaTopLeft'
    | 'alphaTopRight'
  >
>

export type BlendModeProps = Partial<
  Pick<Phaser.GameObjects.Components.BlendMode, 'blendMode'>
>

export type ComputedSizeProps = Partial<
  Pick<
    Phaser.GameObjects.Components.ComputedSize,
    'displayHeight' | 'displayWidth' | 'height' | 'width'
  >
>

export type CropProps = Partial<
  Pick<Phaser.GameObjects.Components.Crop, 'frame' | 'isCropped' | 'texture'>
>

export type DepthProps = Partial<
  Pick<Phaser.GameObjects.Components.Depth, 'depth'>
>

export type FlipProps = Partial<
  Pick<Phaser.GameObjects.Components.Flip, 'flipX' | 'flipY'>
>

export type MaskProps = Partial<
  Pick<Phaser.GameObjects.Components.Mask, 'mask'>
>

export type OriginProps = Partial<
  Pick<
    Phaser.GameObjects.Components.Origin,
    'originX' | 'originY' | 'displayOriginX' | 'displayOriginY'
  >
>

export type PipelineProps = Partial<
  Pick<Phaser.GameObjects.Components.Pipeline, 'defaultPipeline' | 'pipeline'>
>

export type ScrollFactorProps = Partial<
  Pick<
    Phaser.GameObjects.Components.ScrollFactor,
    'scrollFactorX' | 'scrollFactorY'
  >
>

export type TextureCropProps = Partial<
  Pick<Phaser.GameObjects.Components.TextureCrop, 'texture' | 'frame'>
>
export type TintProps = Partial<
  Pick<
    Phaser.GameObjects.Components.Tint,
    | 'isTinted'
    | 'tint'
    | 'tintBottomLeft'
    | 'tintBottomRight'
    | 'tintFill'
    | 'tintTopLeft'
    | 'tintTopRight'
  >
>

export interface TransformProps
  extends Partial<
    Pick<
      Phaser.GameObjects.Components.Transform,
      | 'angle'
      | 'rotation'
      | 'scale'
      | 'scaleX'
      | 'scaleY'
      | 'x'
      | 'y'
      | 'z'
      | 'w'
    >
  > {
  /**
   * Sets the X only on the first render
   */
  initialX?: number

  /**
   * Sets the Y only on the first render
   */
  initialY?: number
}

export type VisibleProps = Partial<
  Pick<Phaser.GameObjects.Components.Visible, 'visible'>
>

// Arcade Physics

export interface ArcadeAccelerationProps {
  acceleration?: number | { x: number; y: number }
}

export interface ArcadeAngularProps {
  angularAcceleration?: number
  angularDrag?: number
  angularVelocity?: number
}

export interface ArcadeBounceProps {
  bounce?: number | { x: number; y: number }
  collideWorldBounds?: boolean
}

export interface ArcadeDebugProps {
  debugBodyColor?: number
  debugShowBody?: boolean
  debugShowVelocity?: boolean
}

export interface ArcadeDragProps {
  damping?: number
  drag?: number | { x: number; y: number }
}

export interface ArcadeEnableProps {
  disableBody?: boolean
  hideBody?: boolean
}

export interface ArcadeFrictionProps {
  friction?: number | { x: number; y: number }
}

export interface ArcadeGravityProps {
  gravity?: number | { x: number; y: number }
}

export interface ArcadeImmovableProps {
  immovable?: boolean
}

export interface ArcadeMassProps {
  mass?: number
}

export interface ArcadeSizeProps {
  circle?: {
    radius: number
    offsetX?: number
    offsetY?: number
  }
  offset?: {
    x?: number
    y?: number
  }
  size?: {
    width: number
    height: number
    center?: number
  }
}

export interface ArcadeVelocityProps {
  velocity?: number | { x: number; y: number }
  maxVelocity?: number | { x: number; y: number }
}

// this should only be imported by reconciler. elements/index.ts will export the renderable component GameObject
const GameObject: CreatePhaserComponentConfig<
  Phaser.GameObjects.GameObject,
  GameObjectProps<Phaser.GameObjects.GameObject>
> = {
  create: ({ object }, scene) => {
    return object
  },
  applyProps: (instance, oldProps, newProps) => {
    applyProps(instance, oldProps, newProps)
  },
}

export default GameObject
