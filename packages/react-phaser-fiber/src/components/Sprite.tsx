import * as Phaser from 'phaser'
import GameObject, { GameObjectProps } from './GameObject'
import { useScene } from '../hooks/useScene'
import React, { useImperativeHandle, useMemo, useLayoutEffect } from 'react'
import {
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
} from '../reconciler'

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
  instance?: Phaser.GameObjects.Sprite
  animations?: Phaser.Types.Animations.Animation[]
  animation?: string
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
      // doing this on every render may be a bad idea, although phaser does shortcircuit
      // if anim.key exists
      animations.forEach(animation => {
        scene.anims.create(animation)
      })
    }
  }, [animations])

  useLayoutEffect(() => {
    if (animation) {
      // phaser 3.22 throws an error if this is true and currentAnim does not exist
      const ignoreIfPlaying = !!instance.anims.currentAnim
      instance.play(animation, ignoreIfPlaying)
    }
  }, [animation])

  return <GameObject instance={instance} {...props} />
}

export default React.forwardRef(Sprite)
