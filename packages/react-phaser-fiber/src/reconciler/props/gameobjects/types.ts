import { CornerValues, Point } from '../types'

export interface AlphaProps {
  alpha?: number | CornerValues
}

export interface AnimationProps {
  /**
   * Plays the animation by key
   */
  animation?: string

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
  progress?: number
  stopOnFrame?: Phaser.Animations.AnimationFrame
  stopAfterDelay?: number
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

export type TextureProps = {
  texture?: string
  frame?: string
}

export interface TintProps {
  tint?: number | CornerValues

  tintFill?: number | CornerValues
}

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
