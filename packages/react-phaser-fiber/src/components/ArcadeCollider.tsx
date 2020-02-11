import React, { useLayoutEffect, useState, useMemo } from 'react'
import useArcadeCollider from '../hooks/useArcadeCollider'

export interface ArcadeColliderProps<With, For> {
  with: With | string | string[]
  for?: For | string | string[]
  children?: React.ReactNode
  onCollide?: (
    self: For extends string ? any : For,
    other: With extends string ? any : With
  ) => any
  onProcess?: (
    self: For extends string ? any : For,
    other: With extends string ? any : With
  ) => any
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
 *  <ArcadeCollider with={myObject}>
 *    <Sprite />
 *  </ArcadeCollider>
 * ```
 *
 * You can also use it for multiple children
 *
 * ```
 *  <ArcadeCollider with={myObject}>
 *    <Sprite />
 *    <Sprite />
 *  </ArcadeCollider>
 * ```
 *
 */
export default function ArcadeCollider<With = any, For = any>(
  props: ArcadeColliderProps<With, For>
): JSX.Element {
  const { children, onCollide, onProcess } = props

  // create refs for each child
  const refs = useMemo(() => {
    return React.Children.map(
      children,
      (child: any) => child.ref || React.createRef()
    )
  }, [children])

  const [objFor, setObjFor] = useState(null)
  const [objWith, setObjWith] = useState(null)

  useLayoutEffect(() => {
    setObjFor(props.for || refs.map(ref => ref.current))
    setObjWith(props.with)
  }, [props.with, children])

  useArcadeCollider(objFor, objWith, onCollide, onProcess)

  // map over each child component and assign the ref
  return (React.Children.map(children, (child: any, index) =>
    React.cloneElement(child, {
      ref: refs[index],
    })
  ) as unknown) as JSX.Element
}
