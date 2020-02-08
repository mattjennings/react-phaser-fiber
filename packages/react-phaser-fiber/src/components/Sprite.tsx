import * as Phaser from 'phaser'
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
} from '../elements/GameObject'
import { GameObject } from '../elements'
import { useGameObject } from '../hooks'
import React, { useImperativeHandle } from 'react'

export interface SpriteProps
  extends Omit<GameObjectProps<Phaser.GameObjects.Sprite>, 'object'>,
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
  texture?: string
  x?: number
  y?: number
  frame?: number
}

function Sprite(props: SpriteProps, ref: React.Ref<Phaser.GameObjects.Sprite>) {
  const object = useGameObject(
    scene =>
      new Phaser.GameObjects.Sprite(
        scene,
        props.x,
        props.y,
        props.texture,
        props.frame
      )
  )
  useImperativeHandle(ref, () => object)

  return <GameObject object={object} {...props} />
}

export default React.forwardRef(Sprite)
