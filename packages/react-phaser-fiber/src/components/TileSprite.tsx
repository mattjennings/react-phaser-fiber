import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import Sprite, { SpriteProps } from './Sprite'
import {
  AlphaProps,
  AnimationProps,
  BlendModeProps,
  DepthProps,
  FlipProps,
  MaskProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  TintProps,
  TransformProps,
  VisibleProps,
  SizeProps,
} from '../reconciler'

export interface TileSpriteProps
  extends Omit<SpriteProps, 'ref' | 'instance' | 'physics'>,
    AlphaProps,
    AnimationProps,
    BlendModeProps,
    DepthProps,
    FlipProps,
    MaskProps,
    OriginProps,
    PipelineProps,
    SizeProps,
    ScrollFactorProps,
    TintProps,
    TransformProps,
    VisibleProps {
  x: number
  y: number
  height: number
  width: number
  texture: string
  tilePositionX?: number
  tilePositionY?: number
  tileScaleX?: number
  tileScaleY?: number
  instance?: Phaser.GameObjects.TileSprite
}

function TileSprite(
  props: TileSpriteProps,
  ref: React.Ref<Phaser.GameObjects.TileSprite>
) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.GameObjects.TileSprite(
        scene,
        props.x,
        props.y,
        props.width,
        props.height,
        props.texture
      ),
    []
  )

  useImperativeHandle(ref, () => instance)

  // reuse the Sprite component because it does some Sprite prop things
  // but we'll need to disguise the props as any. This is smelly, but does
  // share the common Sprite logic
  return <Sprite instance={instance} {...(props as any)} />
}

export default React.forwardRef(TileSprite)
