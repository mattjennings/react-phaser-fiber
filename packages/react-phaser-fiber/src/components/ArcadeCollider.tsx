import React, { useRef, useLayoutEffect, useState } from 'react'
import useArcadeCollider from '../hooks/useArcadeCollider'

export interface ArcadeColliderProps<With, For> {
  with: With | string
  for?: For | string
  children?: JSX.Element | ((ref: React.RefObject<any>) => JSX.Element)
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
 * Creates a collider between the "with" and "for" objects. If provided values are strings, it will
 * search for all objects by that name in the scene.
 *
 * Alternative to the "for" prop, you can use a render function for the children
 * and assign the ref to a child GameObject component
 *
 * ex:
 *  <ArcadeCollider with={myObject}>
 *    {ref => <GameObject ref={ref} />}
 *  </ArcadeCollider>
 */
export default function ArcadeCollider<With = any, For = any>(
  props: ArcadeColliderProps<With, For>
): JSX.Element {
  const { children, onCollide, onProcess } = props

  const ref = useRef(null)
  const [objFor, setObjFor] = useState(null)
  const [objWith, setObjWith] = useState(null)

  useLayoutEffect(() => {
    setObjFor(props.for || ref.current)
    setObjWith(props.with)
  }, [props.with, ref.current])

  useArcadeCollider(objFor, objWith, onCollide, onProcess)

  return isRenderFunction(children) ? children(ref) : (children as JSX.Element)
}

function isRenderFunction(
  children: any
): children is (ref: React.RefObject<any>) => JSX.Element {
  return typeof children === 'function'
}
