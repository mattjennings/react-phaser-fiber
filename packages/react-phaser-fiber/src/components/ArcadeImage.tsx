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
  ArcadeAccelerationProps,
  ArcadeAngularProps,
  ArcadeBounceProps,
  ArcadeDebugProps,
  ArcadeEnableProps,
  ArcadeDragProps,
  ArcadeFrictionProps,
  ArcadeGravityProps,
  ArcadeImmovableProps,
  ArcadeMassProps,
  ArcadeSizeProps,
  ArcadeVelocityProps,
} from './GameObject'
import { useScene } from '../hooks'
import React, { useImperativeHandle, useMemo } from 'react'

export interface ArcadeImageProps
  extends Omit<
      GameObjectProps<Phaser.Physics.Arcade.Image>,
      'instance' | 'ref'
    >,
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
    ArcadeAccelerationProps,
    ArcadeAngularProps,
    ArcadeBounceProps,
    ArcadeDebugProps,
    ArcadeEnableProps,
    ArcadeDragProps,
    ArcadeFrictionProps,
    ArcadeGravityProps,
    ArcadeImmovableProps,
    ArcadeMassProps,
    ArcadeSizeProps,
    ArcadeVelocityProps {
  texture?: string
  frame?: string | number
}

function ArcadeImage(
  props: ArcadeImageProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      new Phaser.Physics.Arcade.Image(
        scene,
        props.x,
        props.y,
        props.texture,
        props.frame
      ),
    []
  )

  useImperativeHandle(ref, () => instance)

  return <GameObject instance={instance} physics="arcade" {...props} />
}

export default React.forwardRef(ArcadeImage)
