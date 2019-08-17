import * as Phaser from 'phaser'

// GameObject
export interface GameObjectProps<T extends Phaser.GameObjects.GameObject> {
  ref?: React.Ref<T>
  name?: string // todo: default to component's displayName?
  active?: boolean
  tabIndex?: boolean
  data?: boolean
  renderFlags?: integer
  cameraFilter?: number
  body?: Phaser.Physics.Arcade.Body | Phaser.Physics.Impact.Body
  ignoreDestroy?: boolean
  input?: Phaser.Types.Input.InteractiveObject
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

export type TransformProps = Partial<
  Pick<
    Phaser.GameObjects.Components.Transform,
    'angle' | 'rotation' | 'scale' | 'scaleX' | 'scaleY' | 'x' | 'y' | 'z' | 'w'
  >
>

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
