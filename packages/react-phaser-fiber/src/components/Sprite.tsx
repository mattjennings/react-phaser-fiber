import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { SpriteElementProps } from '../reconciler/elements/Sprite'
import { GameObjectContext } from '../hooks/useGameObject'

const SpriteElement = (TYPES.Sprite as unknown) as React.FC<SpriteElementProps>

export interface SpriteProps<
  T extends Phaser.GameObjects.Sprite = Phaser.GameObjects.Sprite
> extends Omit<SpriteElementProps, 'instance' | 'scene'> {
  instance?: T
  onAnimationComplete?: (
    animation: Phaser.Animations.Animation,
    frame: Phaser.Animations.AnimationFrame,
    instance: T
  ) => any
}

function Sprite(props: SpriteProps, ref: React.Ref<Phaser.GameObjects.Sprite>) {
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

  return (
    <GameObjectContext.Provider value={instance}>
      <SpriteElement scene={scene} instance={instance} {...props} />
    </GameObjectContext.Provider>
  )
}

export default React.forwardRef(Sprite)
