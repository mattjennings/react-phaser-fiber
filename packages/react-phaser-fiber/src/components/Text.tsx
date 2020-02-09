import * as Phaser from 'phaser'
import React, { useImperativeHandle } from 'react'
import { GameObject } from '../elements'
import {
  AlphaProps,
  BlendModeProps,
  ComputedSizeProps,
  CropProps,
  DepthProps,
  FlipProps,
  GameObjectProps,
  MaskProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  TintProps,
  TransformProps,
  VisibleProps,
} from '../elements/GameObject'
import { useGameObject } from '../hooks'

export interface TextProps
  extends Omit<GameObjectProps<Phaser.GameObjects.Text>, 'object' | 'ref'>,
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
  text?: string | string[]
  style: Phaser.Types.GameObjects.Text.TextStyle
}

function Text(props: TextProps, ref: React.Ref<Phaser.GameObjects.Text>) {
  const object = useGameObject(
    scene =>
      new Phaser.GameObjects.Text(
        scene,
        props.x,
        props.y,
        props.text,
        props.style
      )
  )

  useImperativeHandle(ref, () => object)

  return <GameObject object={object} {...props} />
}

export default React.forwardRef(Text)
