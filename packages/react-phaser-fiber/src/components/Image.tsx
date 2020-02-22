import * as Phaser from 'phaser'
import GameObject, { GameObjectProps } from './GameObject'
import { useScene } from '../hooks/useScene'
import React, { useImperativeHandle, useMemo } from 'react'
import {
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
  VisibleProps,
} from '../reconciler'

export interface ImageProps
  extends Omit<GameObjectProps<Phaser.GameObjects.Image>, 'instance' | 'ref'>,
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
  instance?: Phaser.GameObjects.Image
  texture?: string
  frame?: string | number
}

function Image(props: ImageProps, ref: React.Ref<Phaser.GameObjects.Image>) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.GameObjects.Image(
        scene,
        props.x,
        props.y,
        props.texture,
        props.frame
      ),
    []
  )
  useImperativeHandle(ref, () => instance)

  return <GameObject instance={instance} {...props} />
}

export default React.forwardRef(Image)
