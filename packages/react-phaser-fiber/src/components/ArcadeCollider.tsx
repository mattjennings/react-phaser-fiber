import React, { useRef, useLayoutEffect, useState, useCallback } from 'react'
import useArcadeCollider from '../hooks/useArcadeCollider'

export interface ArcadeColliderProps<With, For> {
  with: With | string
  for?: For | string
  children?: React.ReactNode | ArcadeColliderRenderFn
  onCollide?: (
    self: For extends string ? any : For,
    other: With extends string ? any : With
  ) => any
  onProcess?: (
    self: For extends string ? any : For,
    other: With extends string ? any : With
  ) => any
}

type ArcadeColliderRenderFn = (ref: React.RefObject<any>) => JSX.Element

/**
 * Creates a collider between the "with" and "for" objects. If provided values are strings, it will
 * search for all objects by that name in the scene.
 *
 * Alternative to the "for" prop, you can use a render function for the children
 * and assign the ref to a child GameObject component
 *
 * ```
 *  <ArcadeCollider with={myObject}>
 *    {ref => <GameObject ref={ref} />}
 *  </ArcadeCollider>
 * ```
 *
 * You can also use it for multiple children
 *
 * ```
 *  <ArcadeCollider with={myObject}>
 *    {ref => (
 *      <React.Fragment>
 *        <GameObject ref={ref} />
 *        <GameObject ref={ref} />
 *      </React.Fragment>
 *     )}
 *  </ArcadeCollider>
 * ```
 */
export default function ArcadeCollider<With = any, For = any>(
  props: ArcadeColliderProps<With, For>
): JSX.Element {
  const { children, onCollide, onProcess } = props

  const refs = useRef([])

  // this might be a very bad idea
  const addRef = useCallback(ref => {
    if (!refs.current.includes(ref)) {
      refs.current = [...refs.current, ref]
    }
  }, [])

  const [objFor, setObjFor] = useState(null)
  const [objWith, setObjWith] = useState(null)

  useLayoutEffect(() => {
    setObjFor(props.for || refs.current)
    setObjWith(props.with)
  }, [props.with, refs])

  useArcadeCollider(objFor, objWith, onCollide, onProcess)

  return isRenderFunction(children)
    ? children(addRef as any)
    : (children as JSX.Element)
}

function isRenderFunction(children: any): children is ArcadeColliderRenderFn {
  return typeof children === 'function'
}
