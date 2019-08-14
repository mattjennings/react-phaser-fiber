import invariant from 'fbjs/lib/invariant'
import idx from 'idx'
import { applyDefaultProps } from './props'
import Text from '../components/Text'

export const TYPES = {
  Text: 'Text',
}

export type ElementCreator<
  T extends {
    applyProps?: (instance: T, oldProps: P, newProps: P) => any
  },
  P = {}
> = (root: Phaser.Scene, props: P) => T

const ELEMENTS: Record<keyof typeof TYPES, ElementCreator<any>> = {
  Text,
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
  const create = ELEMENTS[type]

  const instance = create(root, props)

  const { applyProps = applyDefaultProps } = instance

  applyProps(instance, {}, props)

  root.add.existing(instance)

  return instance
}

// export function PhaserComponent(type: string, lifecycle: any) {
//   invariant(!!type, 'Expect type to be defined, got `%s`', type)
//   invariant(
//     !TYPES[type],
//     'Component `%s` could not be created, already exists in default components.',
//     type
//   )

//   TYPES_INJECTED[type] = lifecycle

//   return type
// }
