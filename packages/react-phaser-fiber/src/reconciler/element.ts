import * as Phaser from 'phaser'
import { applyProps as defaultApplyProps } from './applyProps'
import GameObject from './elements/GameObject'

export interface CreatePhaserComponentConfig<
  T extends Phaser.GameObjects.GameObject,
  P
> {
  create: (props: P, game: Phaser.Game) => T
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
  root: Phaser.Game
) {
  const { create, applyProps = defaultApplyProps } = ELEMENTS[type]

  const instance = create(props, root)

  instance.applyProps = applyProps.bind(instance)
  applyProps(instance, {}, props)

  return instance
}
