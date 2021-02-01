import { CreatePhaserComponentConfig } from '../element'
import {
  AlphaProps,
  applyBlendModeProps,
  applyCropProps,
  applyDepthProps,
  applyFlipProps,
  applyGameObjectProps,
  applyMaskProps,
  applyOriginProps,
  applyPipelineProps,
  applyScrollFactorProps,
  applyTintProps,
  applyTransformProps,
  applyVisibleProps,
  applyArcadeAngularProps,
  applyArcadeAccelerationProps,
  BlendModeProps,
  CropProps,
  DepthProps,
  FlipProps,
  GameObjectProps,
  MaskProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  SizeProps,
  TintProps,
  TransformProps,
  VisibleProps,
  applySizeProps,
  TextureProps,
  applyTextureProps,
  ArcadeAccelerationProps,
  ArcadeAngularProps,
  ArcadeBounceProps,
  ArcadeDebugProps,
  ArcadeEnableProps,
  ArcadeDragProps,
  ArcadeFrictionProps,
  ArcadeGravityProps,
  ArcadeImmovableProps,
  ArcadeMassProps,
  ArcadeSizeProps,
  ArcadeVelocityProps,
  applyArcadeBounceProps,
  ArcadeBodyProps,
  applyArcadeDebugProps,
  applyArcadeEnableProps,
  applyArcadeDragProps,
  applyArcadeFrictionProps,
  applyArcadeGravityProps,
  applyArcadeImmovableProps,
  applyArcadeMassProps,
  applyArcadeSizeProps,
  applyArcadeVelocityProps,
  applyArcadeBodyProps,
  applyAnimationProps,
  applyAlphaProps,
  AnimationProps,
} from '../props'
import { initArcadePhysicsObject } from '../util/initArcadePhysicsObject'
import { applySpriteProps } from '../props/gameobjects/applySpriteProps'
import { SpriteProps } from '../../components/Sprite'

export interface ArcadeSpriteElementProps
  extends GameObjectProps<Phaser.Physics.Arcade.Sprite>,
    Pick<SpriteProps<Phaser.Physics.Arcade.Sprite>, 'onAnimationComplete'>,
    AlphaProps,
    AnimationProps,
    BlendModeProps,
    CropProps,
    DepthProps,
    FlipProps,
    MaskProps,
    OriginProps,
    PipelineProps,
    SizeProps,
    ScrollFactorProps,
    TextureProps,
    TintProps,
    TransformProps,
    VisibleProps,
    ArcadeAccelerationProps,
    ArcadeAngularProps,
    ArcadeBodyProps,
    ArcadeBounceProps,
    ArcadeDebugProps,
    ArcadeEnableProps,
    ArcadeDragProps,
    ArcadeFrictionProps,
    ArcadeGravityProps,
    ArcadeImmovableProps,
    ArcadeMassProps,
    ArcadeSizeProps,
    ArcadeVelocityProps {
  instance: Phaser.Physics.Arcade.Sprite
  scene: Phaser.Scene
}

export const ArcadeSpriteElement: CreatePhaserComponentConfig<
  Phaser.Physics.Arcade.Sprite,
  ArcadeSpriteElementProps
> = {
  create: ({ instance, scene, physicsType }) => {
    initArcadePhysicsObject(instance, scene, physicsType)
    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    const ts = window.performance.now()

    applyGameObjectProps(instance, oldProps, newProps)
    applySpriteProps(instance, oldProps, newProps)
    applyAlphaProps(instance, oldProps, newProps)
    applyAnimationProps(instance, oldProps, newProps)
    applyBlendModeProps(instance, oldProps, newProps)
    applyCropProps(instance, oldProps, newProps)
    applyDepthProps(instance, oldProps, newProps)
    applyFlipProps(instance, oldProps, newProps)
    applyMaskProps(instance, oldProps, newProps)
    applyOriginProps(instance, oldProps, newProps)
    applyPipelineProps(instance, oldProps, newProps)
    applySizeProps(instance, oldProps, newProps)
    applyScrollFactorProps(instance, oldProps, newProps)
    applyTextureProps(instance, oldProps, newProps)
    applyTintProps(instance, oldProps, newProps)
    applyTransformProps(instance, oldProps, newProps)
    applyVisibleProps(instance, oldProps, newProps)
    // arcade physics
    applyArcadeAccelerationProps(instance, oldProps, newProps)
    applyArcadeAngularProps(instance, oldProps, newProps)
    applyArcadeBounceProps(instance, oldProps, newProps)
    applyArcadeDebugProps(instance, oldProps, newProps)
    applyArcadeEnableProps(instance, oldProps, newProps)
    applyArcadeDragProps(instance, oldProps, newProps)
    applyArcadeFrictionProps(instance, oldProps, newProps)
    applyArcadeGravityProps(instance, oldProps, newProps)
    applyArcadeImmovableProps(instance, oldProps, newProps)
    applyArcadeMassProps(instance, oldProps, newProps)
    applyArcadeSizeProps(instance, oldProps, newProps)
    applyArcadeVelocityProps(instance, oldProps, newProps)
    applyArcadeBodyProps(instance, oldProps, newProps)
    const te = window.performance.now()
    const t = te - ts
    if (t > 1) {
      console.log(t)
    }
  },
}
