import * as Phaser from 'phaser'
import React, { useImperativeHandle, useMemo } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { TextElementProps } from '../reconciler/elements/Text'

const TextElement = (TYPES.Group as unknown) as React.FC<TextElementProps>

export interface TextProps
  extends Omit<TextElementProps, 'instance' | 'scene'> {
  instance?: Phaser.GameObjects.Text
}

function Text(props: TextProps, ref: React.Ref<Phaser.GameObjects.Text>) {
  const scene = useScene()
  const instance = useMemo(
    () =>
      props.instance ||
      new Phaser.GameObjects.Text(
        scene,
        props.x,
        props.y,
        props.text,
        props.style
      ),
    []
  )

  useImperativeHandle(ref, () => instance)

  return <TextElement scene={scene} instance={instance} {...props} />
}

export default React.forwardRef(Text)
