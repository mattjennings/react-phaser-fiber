import invariant from 'fbjs/lib/invariant'
import { applyDefaultProps } from './props'
import Text from '../components/Text'
import { ApplyProps } from './setApplyProps'

export const TYPES = {
  Text: 'Text',
}

export const TYPES_INJECTED = {}

export type ElementCreator<
  T extends {
    applyProps?: ApplyProps<T, P>
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
//   invariant(!!type, 'Expected type to be defined, got `%s`', type)
//   invariant(
//     !TYPES[type as keyof typeof TYPES],
//     'Component `%s` could not be created, already exists in default components.',
//     type
//   )

//   TYPES_INJECTED[type as keyof typeof TYPES_INJECTED] = lifecycle

//   return type
// }
