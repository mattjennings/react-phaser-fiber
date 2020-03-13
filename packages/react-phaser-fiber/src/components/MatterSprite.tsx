import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { MatterSpriteElementProps } from '../reconciler/elements/MatterSprite'
import { GameObjectContext } from '../hooks/useGameObject'

const MatterSpriteElement = (TYPES.MatterSprite as unknown) as React.FC<
  MatterSpriteElementProps
>

export interface MatterSpriteProps
  extends Omit<MatterSpriteElementProps, 'instance' | 'scene'> {
  instance?: Phaser.Physics.Matter.Sprite
}

function MatterSprite(
  props: MatterSpriteProps,
  ref: React.Ref<Phaser.Physics.Matter.Sprite>
) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.Physics.Matter.Sprite(
        scene.matter.world,
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
      <MatterSpriteElement scene={scene} instance={instance} {...props} />
    </GameObjectContext.Provider>
  )
}

export default React.forwardRef(MatterSprite)
