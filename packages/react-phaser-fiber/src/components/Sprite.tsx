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
import { useScene } from '../hooks'
import React, { useImperativeHandle, useMemo } from 'react'

export interface SpriteProps
  extends Omit<GameObjectProps<Phaser.GameObjects.Sprite>, 'instance' | 'ref'>,
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
  const scene = useScene()
  const instance = useMemo(
    () =>
      new Phaser.GameObjects.Sprite(
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

export default React.forwardRef(Sprite)
