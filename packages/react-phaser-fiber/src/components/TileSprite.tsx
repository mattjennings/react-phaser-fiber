import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { TileSpriteElementProps } from '../reconciler/elements/TileSprite'
import { GameObjectContext } from '../hooks/useGameObject'

const TileSpriteElement = (TYPES.TileSprite as unknown) as React.FC<
  TileSpriteElementProps
>

export interface TileSpriteProps
  extends Omit<TileSpriteElementProps, 'instance' | 'scene'> {
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
        props.texture,
        props.frame
      ),
    []
  )

  useImperativeHandle(ref, () => instance)

  return (
    <GameObjectContext.Provider value={instance}>
      <TileSpriteElement scene={scene} instance={instance} {...props} />
    </GameObjectContext.Provider>
  )
}

export default React.forwardRef(TileSprite)
