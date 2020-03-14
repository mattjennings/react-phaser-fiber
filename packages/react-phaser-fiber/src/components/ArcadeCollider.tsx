import { useArcadeCollider, useGameObject, ColliderObjectType } from '../hooks'
import { useGroup } from '../hooks/useGroup'

export interface ArcadeColliderProps<With extends ColliderObjectType> {
  with: With | With[]
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
  const group = useGroup() as Phaser.Physics.Arcade.Group

  if (!gameObject && !group) {
    // todo: check if it's actually an arcade component/group
    throw Error(
      'ArcadeCollider must be used within an game object or group component'
    )
  }

  useArcadeCollider(gameObject || group, props.with, {
    overlapOnly,
    onCollide,
    onProcess,
  })

  return null
}
