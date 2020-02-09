import React, { useRef, useLayoutEffect, useState } from 'react'
import useArcadeCollider from '../hooks/useArcadeCollider'

export interface ArcadeColliderProps<T = any> {
  with: React.RefObject<T> | T | string
  children: (ref: React.RefObject<any>) => JSX.Element
  onCollide?: (self: any, other: T extends String ? any : T) => any
  onProcess?: (self: any, other: T extends String ? any : T) => any
}

export default function ArcadeCollider<T = any>(
  props: ArcadeColliderProps<T>
): JSX.Element {
  const { children, onCollide, onProcess } = props

  const ref = useRef(null)
  const [firstObj, setFirstObj] = useState(null)
  const [secondObj, setSecondObj] = useState(null)

  useLayoutEffect(() => {
    setFirstObj(ref.current)
    setSecondObj(isRef(props.with) ? props.with.current : props.with)
  }, [props.with, ref.current])

  useArcadeCollider(firstObj, secondObj, onCollide, onProcess)

  return children(ref)
}

function isRef(obj: any): obj is React.RefObject<any> {
  return !!obj.current
}
