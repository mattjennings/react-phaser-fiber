import { useMatterCollider, useGameObject, ColliderObjectType } from '../hooks'

export interface MatterColliderProps<With extends ColliderObjectType> {
  with: With
  onCollide?: (self: any, other: With extends string ? any : With) => any
  onCollideActive?: (self: any, other: With extends string ? any : With) => any
  onCollideEnd?: (self: any, other: With extends string ? any : With) => any
}

/**
 * Creates a collider between the parent GameObject component and the "with" prop. The
 * "with" prop can either be a GameObject, a ref to a GameObject, or a string matching
 * the name of a GameObject (in Phaser).
 *
 * ```
 *  <MatterImage {...props}>
 *    <MatterCollider with="coin">
 *  </MatterImage>
 * ```
 *
 * You can also use it with a custom GameObject component
 *
 * ```
 *  <GameObject instance={instance}>
 *    <MatterCollider with="coin">
 *  </GameObject>
 * ```
 *
 */
export default function MatterCollider<With extends ColliderObjectType = any>(
  props: MatterColliderProps<With>
): JSX.Element {
  const { onCollide, onCollideActive, onCollideEnd } = props

  const gameObject = useGameObject()

  if (!gameObject) {
    throw Error('MatterCollider must be used within a GameObject component')
  }

  useMatterCollider(gameObject, props.with, {
    onCollide,
    onCollideActive,
    onCollideEnd,
  })

  return null
}
