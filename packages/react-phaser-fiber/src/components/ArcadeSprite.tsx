import * as Phaser from 'phaser'
import React, { useImperativeHandle, useLayoutEffect, useMemo } from 'react'
import { useScene } from '../hooks'
import GameObject, {
  AccelerationProps,
  AlphaProps,
  AngularProps,
  AnimationProps,
  BlendModeProps,
  BounceProps,
  ComputedSizeProps,
  DebugProps,
  DepthProps,
  DragProps,
  EnableProps,
  FlipProps,
  FrictionProps,
  GameObjectProps,
  GravityProps,
  ImmovableProps,
  MaskProps,
  MassProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  SizeProps,
  TintProps,
  TransformProps,
  VelocityProps,
  VisibleProps,
} from './GameObject'
import Sprite, { SpriteProps } from './Sprite'

export interface ArcadeSpriteProps
  extends Omit<SpriteProps, 'ref' | 'instance' | 'physics'>,
    AlphaProps,
    AnimationProps,
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
    AccelerationProps,
    AngularProps,
    BounceProps,
    DebugProps,
    EnableProps,
    DragProps,
    FrictionProps,
    GravityProps,
    ImmovableProps,
    MassProps,
    SizeProps,
    VelocityProps {
  instance?: Phaser.Physics.Arcade.Sprite
}

function ArcadeSprite(
  props: ArcadeSpriteProps,
  ref: React.Ref<Phaser.Physics.Arcade.Sprite>
) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.Physics.Arcade.Sprite(
        scene,
        props.x,
        props.y,
        props.texture,
        props.frame
      ),
    []
  )

  useImperativeHandle(ref, () => instance)

  // reuse the Sprite component because it does some Sprite prop things
  // but we'll need to disguise the props as any. This is smelly, but does
  // share the common Sprite logic
  return <Sprite instance={instance} physics="arcade" {...(props as any)} />
}

export default React.forwardRef(ArcadeSprite)
