import * as Phaser from 'phaser'
import { applyDefaultProps } from '../../utils/applyProps'
import {
  AlphaProps,
  BlendModeProps,
  ComputedSizeProps,
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

export interface ImageProps
  extends GameObjectProps<Phaser.GameObjects.Image>,
    AlphaProps,
    BlendModeProps,
    ComputedSizeProps,
    DepthProps,
    FlipProps,
    MaskProps,
    OriginProps,
    PipelineProps,
    ScrollFactorProps,
    TintProps,
    TransformProps,
    VisibleProps {
  texture: string
  x: number
  y: number
  frame?: string | number
}

const Image: CreatePhaserComponentConfig<
  Phaser.GameObjects.Image,
  ImageProps
> = {
  create: ({ x, y, texture, frame }, scene) => {
    return new Phaser.GameObjects.Image(scene, x, y, texture, frame)
  },
  applyProps: (instance, oldProps, newProps) => {
    const { texture, frame, ...props } = newProps

    if (texture !== oldProps.texture) {
      instance.setTexture(texture)
    }

    if (frame !== oldProps.frame) {
      instance.setFrame(frame)
    }

    applyDefaultProps(instance, oldProps, props)
  },
}

export default Image
