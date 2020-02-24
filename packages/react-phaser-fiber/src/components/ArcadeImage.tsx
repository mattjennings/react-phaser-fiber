import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { ArcadeImageElementProps } from '../reconciler/elements/ArcadeImage'
import { GameObjectContext } from '../hooks/useGameObject'

const ArcadeImageElement = (TYPES.ArcadeImage as unknown) as React.FC<
  ArcadeImageElementProps
>

export interface ArcadeImageProps
  extends Omit<ArcadeImageElementProps, 'instance' | 'scene'> {
  instance?: Phaser.Physics.Arcade.Image
}

function ArcadeImage(
  props: ArcadeImageProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
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

  return (
    <GameObjectContext.Provider value={instance}>
      <ArcadeImageElement scene={scene} instance={instance} {...props} />
    </GameObjectContext.Provider>
  )
}

export default React.forwardRef(ArcadeImage)
