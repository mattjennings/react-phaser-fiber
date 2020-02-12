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
import React, { useImperativeHandle, useMemo, useLayoutEffect } from 'react'
import { AnimationProps } from '../reconciler/elements/GameObject'

export interface SpriteProps
  extends Omit<GameObjectProps<Phaser.GameObjects.Sprite>, 'instance' | 'ref'>,
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
    VisibleProps {
  animations?: Phaser.Types.Animations.Animation[]
  animation?: string
  instance?: Phaser.GameObjects.Sprite
  texture?: string
  x?: number
  y?: number
  frame?: number
}

function Sprite(
  { animations, animation, ...props }: SpriteProps,
  ref: React.Ref<Phaser.GameObjects.Sprite>
) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
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

  return <GameObject instance={instance} {...props} />
}

export default React.forwardRef(Sprite)
