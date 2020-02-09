import * as Phaser from 'phaser'
import GameObject, {
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
} from './GameObject'
import { useGameObject } from '../hooks'
import React, { useImperativeHandle } from 'react'

export interface ImageProps
  extends Omit<GameObjectProps<Phaser.GameObjects.Image>, 'object' | 'ref'>,
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
  frame?: string | number
}

function Image(props: ImageProps, ref: React.Ref<Phaser.GameObjects.Image>) {
  const object = useGameObject(
    scene =>
      new Phaser.GameObjects.Image(
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

export default React.forwardRef(Image)
