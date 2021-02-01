import { TileSpriteProps } from '../../components'
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
  applySizeProps,
  applyTextureProps,
  applyAlphaProps,
} from '../props'
import { iterateProps } from '../util/iterateProps'

export interface TileSpriteElementProps
  extends GameObjectProps<Phaser.GameObjects.TileSprite>,
    AlphaProps,
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
  instance: Phaser.GameObjects.TileSprite
  scene: Phaser.Scene
  width: number
  height: number
  tilePositionX?: number
  tilePositionY?: number
  tileScaleX?: number
  tileScaleY?: number
}

export const TileSpriteElement: CreatePhaserComponentConfig<
  Phaser.GameObjects.TileSprite,
  TileSpriteElementProps
> = {
  create: ({ instance }) => {
    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
      switch (key) {
        case 'tilePositionX':
          instance.tilePositionX = newValue
          break
        case 'tilePositionY':
          instance.tilePositionY = newValue
          break
        case 'tileScaleX':
          instance.tileScaleX = newValue
          break
        case 'tileScaleY':
          instance.tileScaleY = newValue
          break
      }
    })

    applyGameObjectProps(instance, oldProps, newProps)
    applyAlphaProps(instance, oldProps, newProps)
    applyBlendModeProps(instance, oldProps, newProps)
    applyCropProps(instance, oldProps, newProps)
    applyDepthProps(instance, oldProps, newProps)
    applyFlipProps(instance, oldProps, newProps)
    applyMaskProps(instance, oldProps, newProps)
    applyOriginProps(instance, oldProps, newProps)
    applyPipelineProps(instance, oldProps, newProps)
    applyScrollFactorProps(instance, oldProps, newProps)
    applySizeProps(instance, oldProps, newProps)
    applyTextureProps(instance, oldProps, newProps)
    applyTintProps(instance, oldProps, newProps)
    applyTransformProps(instance, oldProps, newProps)
    applyVisibleProps(instance, oldProps, newProps)
  },
}

function getProps(props: TileSpriteProps) {
  const { tilePositionX, tilePositionY, tileScaleX, tileScaleY } = props

  return {
    tilePositionX,
    tilePositionY,
    tileScaleX,
    tileScaleY,
  }
}
