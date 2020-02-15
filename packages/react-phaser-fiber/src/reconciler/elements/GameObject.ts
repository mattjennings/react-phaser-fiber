import { applyProps } from '../applyProps'
import { CreatePhaserComponentConfig } from '../element'

export interface GameObjectProps<T extends Phaser.GameObjects.GameObject> {
  instance: T
  ref?: React.Ref<T>
  name?: string
  active?: boolean
  tabIndex?: boolean
  data?: any
  renderFlags?: integer
  cameraFilter?: number
  ignoreDestroy?: boolean
  input?: Phaser.Types.Input.InteractiveObject
  children?: React.ReactNode

  /**
   * Creates the body in the phaser for the specified physics world
   *
   * note: only 'arcade' is supported for now
   */
  physics?: 'arcade'
  physicsType?: 'static' | 'dynamic'
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
  allowRotation?: boolean
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

export interface AnimationProps {
  playingAnimation?: string
  accumulator?: number
  delay?: number
  duration?: number
  forward?: boolean
  frameRate?: number
  isPlaying?: boolean
  msPerFrame?: number
  skipMissedFrames?: boolean
  progress?: boolean
  stopOnFrame?: Phaser.Animations.AnimationFrame
  stopAfterDelay?: number
  repeat?: boolean
  repeatDelay?: number
  timeScale?: number
  yoyo?: boolean
}

// Arcade Physics
export interface AccelerationProps {
  accelerationX?: number
  accelerationY?: number
  acceleration?: number | { x: number; y: number }
}

export interface AngularProps {
  angularAcceleration?: number
  angularDrag?: number
  angularVelocity?: number
}

export interface BounceProps {
  bounceX?: number
  bounceY?: number
  bounce?: number | { x: number; y: number }
  collideWorldBounds?: boolean
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
  drag?: number | { x: number; y: number }
  allowDrag?: boolean
}

export interface EnableProps {
  disableBody?: boolean
  hideBody?: boolean
}

export interface FrictionProps {
  frictionX?: number
  frictionY?: number
  friction?: number | { x: number; y: number }
}

export interface GravityProps {
  allowGravity?: boolean
  gravityX?: number
  gravityY?: number
  gravity?: number | { x: number; y: number }
}

export interface ImmovableProps {
  immovable?: boolean
}

export interface MassProps {
  mass?: number
}

export interface SizeProps {
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

export interface VelocityProps {
  velocity?: number | { x: number; y: number }
  velocityX?: number
  velocityY?: number
  maxVelocity?: number | { x: number; y: number }
}

const GameObject: CreatePhaserComponentConfig<
  Phaser.GameObjects.GameObject,
  GameObjectProps<Phaser.GameObjects.GameObject> & { scene: Phaser.Scene }
> = {
  create: ({ instance, scene, physics, physicsType }) => {
    // @ts-ignore - we need to set the scene key so hostconfig knows which scene to add this instance to
    instance.__reactPhaser = {
      sceneKey: scene.scene.key,
    }

    // if this is a physics object we need to add the body before applyProps
    if (physics === 'arcade' && scene) {
      scene.physics.world.enable(
        instance,
        physicsType === 'static'
          ? Phaser.Physics.Arcade.STATIC_BODY
          : Phaser.Physics.Arcade.DYNAMIC_BODY
      )
    }
    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    applyProps(instance, oldProps, newProps)
  },
}

export default GameObject
