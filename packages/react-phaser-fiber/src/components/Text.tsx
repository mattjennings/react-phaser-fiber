import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import GameObject, {
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
} from './GameObject'
import { useScene } from '../hooks/useScene'

export interface TextProps
  extends Omit<GameObjectProps<Phaser.GameObjects.Text>, 'instance' | 'ref'>,
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
  instance?: Phaser.GameObjects.Text
  text?: string | string[]
  style: Phaser.Types.GameObjects.Text.TextStyle
}

function Text(props: TextProps, ref: React.Ref<Phaser.GameObjects.Text>) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.GameObjects.Text(
        scene,
        props.x,
        props.y,
        props.text,
        props.style
      ),
    []
  )

  useImperativeHandle(ref, () => instance)

  return <GameObject instance={instance} {...props} />
}

export default React.forwardRef(Text)
