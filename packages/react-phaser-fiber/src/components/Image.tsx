import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { ImageElementProps } from '../reconciler/elements/Image'
import { GameObjectContext } from '../hooks/useGameObject'

const ImageElement = (TYPES.Image as unknown) as React.FC<ImageElementProps>

export interface ImageProps
  extends Omit<ImageElementProps, 'instance' | 'scene'> {
  instance?: Phaser.GameObjects.Image
}

function Image(props: ImageProps, ref: React.Ref<Phaser.GameObjects.Image>) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.GameObjects.Image(
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
      <ImageElement scene={scene} instance={instance} {...props} />
    </GameObjectContext.Provider>
  )
}

export default React.forwardRef(Image)
