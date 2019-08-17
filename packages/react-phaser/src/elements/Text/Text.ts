import * as Phaser from 'phaser'
import { applyDefaultProps } from '../../utils/props'
import {
  AlphaProps,
  BlendModeProps,
  ComputedSizeProps,
  CropProps,
  DepthProps,
  FlipProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  TransformProps,
  VisibleProps,
  MaskProps,
  TintProps,
  GameObjectProps,
} from '..'
import { CreatePhaserComponentConfig } from '../../utils/element'

export interface TextProps
  extends GameObjectProps<Phaser.GameObjects.Text>,
    AlphaProps,
    BlendModeProps,
    ComputedSizeProps,
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
  x: number
  y: number
  text: string | string[]
  style: Phaser.Types.GameObjects.Text.TextStyle
}

const Text: CreatePhaserComponentConfig<Phaser.GameObjects.Text, TextProps> = {
  create: ({ x, y, text, style }, scene) => {
    return new Phaser.GameObjects.Text(scene, x, y, text, style)
  },
  applyProps: (instance, oldProps, newProps) => {
    const { style, ...props } = newProps

    applyDefaultProps(instance, oldProps, props)

    if (oldProps.style !== newProps.style) {
      instance.setStyle(style)
    }
  },
}

export default Text
