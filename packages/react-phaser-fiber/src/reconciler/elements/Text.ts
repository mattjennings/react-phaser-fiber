import { CreatePhaserComponentConfig } from '../element'
import {
  AlphaProps,
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
} from '../props'
import { iterateProps } from '../props/iterateProps'
import { assignSceneKey } from '../assignSceneKey'

export interface TextElementProps
  extends GameObjectProps<Phaser.GameObjects.Text>,
    AlphaProps,
    BlendModeProps,
    SizeProps,
    CropProps,
    DepthProps,
    FlipProps,
    MaskProps,
    OriginProps,
    PipelineProps,
    ScrollFactorProps,
    TintProps,
    TransformProps,
    VisibleProps {
  instance: Phaser.GameObjects.Text
  scene: Phaser.Scene
  text?: string | string[]
  style: Phaser.Types.GameObjects.Text.TextStyle
}

export const TextElement: CreatePhaserComponentConfig<
  Phaser.GameObjects.Text,
  TextElementProps
> = {
  create: ({ instance }) => {
    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    // apply text props
    iterateProps(oldProps, newProps, (key, newValue) => {
      switch (key) {
        case 'text':
          instance.setText(newValue as string)
          break
        case 'style':
          instance.setStyle(newValue as Phaser.Types.GameObjects.Text.TextStyle)
          break
      }
    })

    applyGameObjectProps(instance, oldProps, newProps)
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
