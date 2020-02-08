import * as Phaser from 'phaser'
import invariant from 'fbjs/lib/invariant'
import { applyProps as defaultApplyProps } from './applyProps'
import GameObject from '../elements/GameObject'

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
  props = {},
  root: Phaser.Scene
) {
  const { create, applyProps = defaultApplyProps } = ELEMENTS[type]

  const instance = create(props, root)
  instance.applyProps = applyProps.bind(instance)

  applyProps(instance, {}, props)

  return instance
}

// external use

/**
 * Creates a custom Phaser component
 * @param type
 * @param config
 */
export function createPhaserComponent<
  T extends Phaser.GameObjects.GameObject,
  P
>(type: string, config: CreatePhaserComponentConfig<T, P>) {
  invariant(!!type, 'Expected type to be defined, got `%s`', type)
  invariant(
    !TYPES[type as keyof typeof TYPES],
    'Component `%s` already exists',
    type
  )

  TYPES[type as keyof typeof TYPES] = type
  ELEMENTS[type] = config

  // type needs to be returned as string for reconciler, but externally it will be typed
  // as a component
  return (type as unknown) as React.ComponentType<P>
}
