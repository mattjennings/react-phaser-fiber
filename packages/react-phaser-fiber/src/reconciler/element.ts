import * as Phaser from 'phaser'
import invariant from 'fbjs/lib/invariant'
import { applyProps as defaultApplyProps } from './applyProps'
import GameObject from './elements/GameObject'

export interface CreatePhaserComponentConfig<
  T extends Phaser.GameObjects.GameObject,
  P
> {
  create: (props: P, scene: Phaser.Scene) => T
  applyProps?: (instance: T, oldProps: P, newProps: P) => any
}

export const TYPES: Record<string, string> = {
  GameObject: 'GameObject',
}

export const ELEMENTS: Record<string, CreatePhaserComponentConfig<any, any>> = {
  GameObject,
}

/**
 * Create an element based on tag type
 * Similar to react-dom's `React.createElement()`
 *
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
export function createElement(
  type: keyof typeof TYPES,
  props: any = {},
  root: Phaser.Scene
) {
  const { create, applyProps = defaultApplyProps } = ELEMENTS[type]

  const instance = create(props, root)

  // if this is a physics object we need to add the body before applyProps
  if (props.physics === 'arcade') {
    root.physics.add.existing(instance)
  }

  instance.applyProps = applyProps.bind(instance)
  applyProps(instance, {}, props)

  return instance
}
