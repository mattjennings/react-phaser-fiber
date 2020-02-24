import { CreatePhaserComponentConfig } from '../element'
import {
  AlphaProps,
  AnimationProps,
  applyAnimationProps,
  applyBlendModeProps,
  applyCropProps,
  applyDepthProps,
  applyFlipProps,
  applyMaskProps,
  applyOriginProps,
  applyPipelineProps,
  applyScrollFactorProps,
  applyTintProps,
  applyTransformProps,
  applyVisibleProps,
  BlendModeProps,
  DepthProps,
  FlipProps,
  MaskProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  SizeProps,
  TintProps,
  TransformProps,
  VisibleProps,
  CropProps,
  applyGameObjectProps,
  GameObjectProps,
  TextureProps,
} from '../props'
import { assignSceneKey } from '../assignSceneKey'

export interface SpriteElementProps
  extends GameObjectProps<Phaser.GameObjects.Sprite>,
    AlphaProps,
    AnimationProps,
    BlendModeProps,
    CropProps,
    SizeProps,
    DepthProps,
    FlipProps,
    MaskProps,
    OriginProps,
    PipelineProps,
    ScrollFactorProps,
    TextureProps,
    TintProps,
    TransformProps,
    VisibleProps {
  instance: Phaser.GameObjects.Sprite
  scene: Phaser.Scene
}

export const SpriteElement: CreatePhaserComponentConfig<
  Phaser.GameObjects.Sprite,
  SpriteElementProps
> = {
  create: ({ instance, scene }) => {
    assignSceneKey(instance, scene)
    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    applyGameObjectProps(instance, oldProps, newProps)
    applyAnimationProps(instance, oldProps, newProps)
    applyBlendModeProps(instance, oldProps, newProps)
    applyCropProps(instance, oldProps, newProps)
    applyDepthProps(instance, oldProps, newProps)
    applyFlipProps(instance, oldProps, newProps)
    applyMaskProps(instance, oldProps, newProps)
    applyOriginProps(instance, oldProps, newProps)
    applyPipelineProps(instance, oldProps, newProps)
    applyScrollFactorProps(instance, oldProps, newProps)
    applyTintProps(instance, oldProps, newProps)
    applyTransformProps(instance, oldProps, newProps)
    applyVisibleProps(instance, oldProps, newProps)
  },
}
