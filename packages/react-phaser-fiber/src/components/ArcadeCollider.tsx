import { useArcadeCollider, useGameObject, ColliderObjectType } from '../hooks'

export interface ArcadeColliderProps<With extends ColliderObjectType> {
  with: With
  overlapOnly?: boolean
  onCollide?: (self: any, other: With extends string ? any : With) => any
  onProcess?: (self: any, other: With extends string ? any : With) => any
}

/**
 * Creates a collider between the parent GameObject component and the "with" prop. The
 * "with" prop can either be a GameObject, a ref to a GameObject, or a string matching
 * the name of a GameObject (in Phaser).
 *
 * ```
 *  <ArcadeImage {...props}>
 *    <ArcadeCollider with="coin">
 *  </ArcadeImage>
 * ```
 *
 * You can also use it with a custom GameObject component
 *
 * ```
 *  <GameObject instance={instance}>
 *    <ArcadeCollider with="coin">
 *  </GameObject>
 * ```
 *
 */
export default function ArcadeCollider<With extends ColliderObjectType = any>(
  props: ArcadeColliderProps<With>
): JSX.Element {
  const { onCollide, onProcess, overlapOnly } = props

  const gameObject = useGameObject()

  if (!gameObject) {
    throw Error('ArcadeCollider must be used within a GameObject component')
  }

  useArcadeCollider(gameObject, props.with, {
    overlapOnly,
    onCollide,
    onProcess,
  })

  return null
}
