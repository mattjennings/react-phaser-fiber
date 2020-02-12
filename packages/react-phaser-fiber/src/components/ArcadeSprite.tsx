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
  AnimationProps,
} from './GameObject'
import { useScene } from '../hooks'
import React, { useImperativeHandle, useMemo, useLayoutEffect } from 'react'

export interface ArcadeSpriteProps
  extends Omit<
      GameObjectProps<Phaser.Physics.Arcade.Sprite>,
      'ref' | 'instance' | 'physics'
    >,
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
  animations?: Phaser.Types.Animations.Animation[]
  animation?: string
  instance?: Phaser.Physics.Arcade.Sprite
  texture?: string
  x?: number
  y?: number
  frame?: number
}

function ArcadeSprite(
  { animations, animation, ...props }: ArcadeSpriteProps,
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

  useLayoutEffect(() => {
    if (animations) {
      animations.forEach(animation => {
        scene.anims.create(animation)
      })
    }
    return () => {
      if (animations) {
        animations.forEach(animation => {
          scene.anims.remove(animation.key)
        })
      }
    }
  }, [animations])

  useLayoutEffect(() => {
    if (animation) {
      instance.play(animation, true)
    }
  }, [animation])

  return <GameObject instance={instance} physics="arcade" {...props} />
}

export default React.forwardRef(ArcadeSprite)
