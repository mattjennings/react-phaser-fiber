import * as Phaser from 'phaser'
import invariant from 'fbjs/lib/invariant'
import { SpriteElement } from './elements/Sprite'
import { GroupElement } from './elements/Group'
import { TextElement } from './elements/Text'
import { ImageElement } from './elements/Image'

export interface CreatePhaserComponentConfig<T, P> {
  create: (props: P, game: Phaser.Game) => T
  applyProps?: (instance: T, oldProps: P, newProps: P) => any
}

export const TYPES: Record<string, string> = {
  Text: 'Text',
  Image: 'Image',
  Sprite: 'Sprite',
  Group: 'Group',
}

export const ELEMENTS: Record<string, CreatePhaserComponentConfig<any, any>> = {
  Text: TextElement,
  Sprite: SpriteElement,
  Image: ImageElement,
  Group: GroupElement,
}

/******************
 *  External API  *
 ******************/

/**
 * Creates a custom Phaser component
 * @param type
 * @param config
 */
// not sure if we want to allow this or not
// export function createPhaserComponent<
//   T extends Phaser.GameObjects.GameObject,
//   P
// >(type: string, config: CreatePhaserComponentConfig<T, P>) {
//   invariant(!!type, `Expected type to be defined, got ${type}`)
//   invariant(
//     !TYPES[type as keyof typeof TYPES],
//     `Component ${type} already exists`
//   )

//   TYPES[type as keyof typeof TYPES] = type
//   ELEMENTS[type] = config

//   // type needs to be returned as string for reconciler, but externally it will be typed
//   // as a component
//   return (type as unknown) as React.ComponentType<P>
// }
