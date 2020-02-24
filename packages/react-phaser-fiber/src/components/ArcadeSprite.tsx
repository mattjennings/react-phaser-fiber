import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { ArcadeSpriteElementProps } from '../reconciler/elements/ArcadeSprite'
import { GameObjectContext } from '../hooks/useGameObject'

const ArcadeSpriteElement = (TYPES.ArcadeSprite as unknown) as React.FC<
  ArcadeSpriteElementProps
>

export interface ArcadeSpriteProps
  extends Omit<ArcadeSpriteElementProps, 'instance' | 'scene'> {
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

  return (
    <GameObjectContext.Provider value={instance}>
      <ArcadeSpriteElement scene={scene} instance={instance} {...props} />
    </GameObjectContext.Provider>
  )
}

export default React.forwardRef(ArcadeSprite)
