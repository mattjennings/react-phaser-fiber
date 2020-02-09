import React, { useRef, useLayoutEffect, useState } from 'react'
import useArcadeCollider from '../hooks/useArcadeCollider'

export interface ArcadeColliderProps<T> {
  with: React.RefObject<T>
  children: (ref: React.RefObject<any>) => JSX.Element
  onCollide?: (obj1: any, obj2: T) => any
  onProcess?: (obj1: any, obj2: T) => any
}

export default function ArcadeCollider<T>(
  props: ArcadeColliderProps<T>
): JSX.Element {
  const { children, onCollide, onProcess } = props

  const ref = useRef(null)
  const [firstObj, setFirstObj] = useState(null)
  const [secondObj, setSecondObj] = useState(null)

  useLayoutEffect(() => {
    setFirstObj(ref.current)
    setSecondObj(props.with.current)
  }, [props.with, ref.current])

  useArcadeCollider(firstObj, secondObj, onCollide, onProcess)

  return children(ref)
}
