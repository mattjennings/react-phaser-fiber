import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { MatterImageElementProps } from '../reconciler/elements/MatterImage'
import { GameObjectContext } from '../hooks/useGameObject'

const MatterImageElement = (TYPES.MatterImage as unknown) as React.FC<
  MatterImageElementProps
>

export interface MatterImageProps
  extends Omit<MatterImageElementProps, 'instance' | 'scene'> {
  instance?: Phaser.Physics.Matter.Image
}

function MatterImage(
  props: MatterImageProps,
  ref: React.Ref<Phaser.Physics.Matter.Image>
) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.Physics.Matter.Image(
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
      <MatterImageElement scene={scene} instance={instance} {...props} />
    </GameObjectContext.Provider>
  )
}

export default React.forwardRef(MatterImage)
