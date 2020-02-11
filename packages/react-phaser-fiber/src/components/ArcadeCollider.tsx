import { useLayoutEffect, useState } from 'react'
import useArcadeCollider from '../hooks/useArcadeCollider'
import { useGameObject } from './GameObject'

export interface ArcadeColliderProps<With> {
  with: With | string | string[]
  onCollide?: (self: any, other: With extends string ? any : With) => any
  onProcess?: (self: any, other: With extends string ? any : With) => any
}

/**
 * Creates a collider between the child GameObject component and the "with" prop. The
 * "with" prop can either be a GameObject, a ref to a GameObject, or a string that is
 * the name of the GameObject (in Phaser).
 *
 * Alternatively, you can use the "for" prop instead of children which acts like the "with" prop
 *
 * Note: The child component must forward refs using React.forwardRef to a GameObject or <GameObject /> component
 *
 * ```
 *  <ArcadeCollider with="my-game-object">
 *    <Sprite />
 *  </ArcadeCollider>
 * ```
 *
 * You can also use it for multiple children
 *
 * ```
 *  <ArcadeCollider with="my-game-object">
 *    <Sprite />
 *    <Sprite />
 *  </ArcadeCollider>
 * ```
 *
 */
export default function ArcadeCollider<With = any>(
  props: ArcadeColliderProps<With>
): JSX.Element {
  const { onCollide, onProcess } = props

  const gameObject = useGameObject()

  const [objWith, setObjWith] = useState(null)

  useLayoutEffect(() => {
    setObjWith(props.with)
  }, [props.with, gameObject])

  useArcadeCollider(gameObject, objWith, onCollide, onProcess)

  return null
  // map over each child component and assign the ref
  // return renderChildrenWithRefs(children, refs)
}
