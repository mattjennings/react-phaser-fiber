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

export interface SpriteProps
  extends GameObjectProps<Phaser.GameObjects.Sprite>,
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
  frame?: number
}

const Sprite: CreatePhaserComponentConfig<
  Phaser.GameObjects.Sprite,
  SpriteProps
> = {
  create: ({ x, y, texture, frame }, scene) => {
    return new Phaser.GameObjects.Sprite(scene, x, y, texture, frame)
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

export default Sprite
