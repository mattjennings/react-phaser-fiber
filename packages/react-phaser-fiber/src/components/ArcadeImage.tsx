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
  GameObject,
} from '../elements'
import { useGameObject } from '../hooks'
import React, { useImperativeHandle } from 'react'

export interface ArcadeImageProps
  extends Omit<GameObjectProps<Phaser.Physics.Arcade.Image>, 'object' | 'ref'>,
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
  const object = useGameObject(scene => {
    const instance = new Phaser.Physics.Arcade.Image(
      scene,
      props.x,
      props.y,
      props.texture,
      props.frame
    )

    scene.physics.add.existing(instance)

    return instance
  })

  useImperativeHandle(ref, () => object)

  return <GameObject object={object} {...props} />
}

export default React.forwardRef(ArcadeImage)
