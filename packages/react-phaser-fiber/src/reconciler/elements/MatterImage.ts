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
  MatterBounceProps,
  MatterCollisionProps,
  MatterForceProps,
  MatterFrictionProps,
  MatterGravityProps,
  MatterMassProps,
  MatterSensorProps,
  MatterSetBodyProps,
  MatterSleepProps,
  MatterStaticProps,
  MatterVelocityProps,
  MatterTransformProps,
  applyMatterBounceProps,
  applyMatterCollisionProps,
  applyMatterForceProps,
  applyMatterFrictionProps,
  applyMatterGravityProps,
  applyMatterMassProps,
  applyMatterSensorProps,
  applyMatterSetBodyProps,
  applyMatterSleepProps,
  applyMatterStaticProps,
  applyMatterVelocityProps,
  applyMatterTransformProps,
} from '../props'
import { initMatterPhysicsObject } from '../util/initMatterPhysicsObject'

export interface MatterImageElementProps
  extends GameObjectProps<Phaser.Physics.Matter.Image>,
    AlphaProps,
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
    MatterBounceProps,
    MatterCollisionProps,
    MatterForceProps,
    MatterFrictionProps,
    MatterGravityProps,
    MatterMassProps,
    MatterSensorProps,
    MatterSetBodyProps,
    MatterSleepProps,
    MatterStaticProps,
    MatterVelocityProps,
    MatterTransformProps {
  instance: Phaser.Physics.Matter.Image
  scene: Phaser.Scene
}

export const MatterImageElement: CreatePhaserComponentConfig<
  Phaser.Physics.Matter.Image,
  MatterImageElementProps
> = {
  create: ({ instance, scene }) => {
    initMatterPhysicsObject(instance, scene)

    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    // !IMPORTANT must create body first or options will overwrite properties
    applyMatterSetBodyProps(instance, oldProps, newProps)

    // GameObject Props
    applyGameObjectProps(instance, oldProps, newProps)
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

    // matter physics
    applyMatterBounceProps(instance, oldProps, newProps)
    applyMatterCollisionProps(instance, oldProps, newProps)
    applyMatterForceProps(instance, oldProps, newProps)
    applyMatterFrictionProps(instance, oldProps, newProps)
    applyMatterGravityProps(instance, oldProps, newProps)
    applyMatterMassProps(instance, oldProps, newProps)
    applyMatterSensorProps(instance, oldProps, newProps)
    applyMatterSleepProps(instance, oldProps, newProps)
    applyMatterStaticProps(instance, oldProps, newProps)
    applyMatterVelocityProps(instance, oldProps, newProps)
    applyMatterTransformProps(instance, oldProps, newProps)
  },
}
