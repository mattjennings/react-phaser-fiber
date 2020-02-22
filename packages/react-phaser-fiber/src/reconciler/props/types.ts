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

export type Point = {
  x: number
  y: number
}

export type BlendModeProps = Partial<
  Pick<Phaser.GameObjects.Components.BlendMode, 'blendMode'>
>

export type SizeProps = Partial<
  Pick<
    Phaser.GameObjects.Components.Size,
    'displayHeight' | 'displayWidth' | 'height' | 'width'
  >
> & {
  setSizeToFrame?: Phaser.Textures.Frame
}

export interface CropProps {
  crop?: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
  isCropped?: boolean
}

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

export type ScrollFactorProps = Partial<
  Pick<
    Phaser.GameObjects.Components.ScrollFactor,
    'scrollFactorX' | 'scrollFactorY'
  >
>

export interface PathFollowerProps {
  path?: Phaser.Curves.Path

  /**
   * Starts this PathFollower following its given Path.
   */
  follow?:
    | Phaser.Types.GameObjects.PathFollower.PathConfig
    | Phaser.Types.Tweens.NumberTweenBuilderConfig

  /**
   * Pauses this PathFollower. It will still continue to render, but it will remain motionless at the
   * point on the Path at which you paused it.
   */
  pauseFollow?: boolean
}

export interface PipelineProps {
  pipeline?: string
}

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
    'angle' | 'rotation' | 'x' | 'y' | 'z' | 'w'
  > & {
    scale?: number | (Point & { point?: Point })
    allowRotation?: boolean
  }
>

export type VisibleProps = Partial<
  Pick<Phaser.GameObjects.Components.Visible, 'visible'>
>

export interface AnimationProps {
  accumulator?: number
  delay?: number
  duration?: number
  forward?: boolean
  frameRate?: number
  isPlaying?: boolean
  msPerFrame?: number
  skipMissedFrames?: boolean
  repeat?: number
  repeatDelay?: number
  timeScale?: number
  yoyo?: boolean
}

// Arcade Physics
export interface AccelerationProps {
  accelerationX?: number
  accelerationY?: number
  acceleration?: number | Point
}

export interface AngularProps {
  angularAcceleration?: number
  angularDrag?: number
  angularVelocity?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BodyProps {
  allowRotation?: boolean
  // todo
  // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#toc3__anchor
}

export interface BounceProps {
  bounceX?: number
  bounceY?: number
  bounce?: number | Point
  collideWorldBounds?: boolean
  onWorldBounds?: boolean
}

export interface DebugProps {
  debugBodyColor?: number
  debugShowBody?: boolean
  debugShowVelocity?: boolean
}

export interface DragProps {
  damping?: number
  dragX?: number
  dragY?: number
  drag?: number | Point
  allowDrag?: boolean
}

export interface EnableProps {
  disableBody?: boolean

  /**
   * If disableBody is true, this will also hide the body
   */
  hideBody?: boolean
}

export interface FrictionProps {
  frictionX?: number
  frictionY?: number
  friction?: number | Point
}

export interface GravityProps {
  allowGravity?: boolean
  gravityX?: number
  gravityY?: number
  gravity?: number | Point
}

export interface ImmovableProps {
  immovable?: boolean
}

export interface MassProps {
  mass?: number
}

// export interface SizeProps {
//   circle?: {
//     radius: number
//     offsetX?: number
//     offsetY?: number
//   }
//   offset?: {
//     x?: number
//     y?: number
//   }
//   size?: {
//     width: number
//     height: number
//     center?: number
//   }
// }

export interface VelocityProps {
  velocity?: number | Point
  velocityX?: number
  velocityY?: number
  maxVelocity?: number | Point
}
