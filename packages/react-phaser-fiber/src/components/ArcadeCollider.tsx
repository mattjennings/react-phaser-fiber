import React, { useRef, useLayoutEffect, useState } from 'react'
import useArcadeCollider from '../hooks/useArcadeCollider'

export interface ArcadeColliderProps {
  children: React.ReactNode
  onCollide?: (obj1: any, obj2: any) => any
  onProcess?: (obj1: any, obj2: any) => any
}

export default function ArcadeCollider({
  children,
  onCollide,
  onProcess,
}: ArcadeColliderProps): JSX.Element {
  const [childRefs, setChildRefs] = useState([])
  useLayoutEffect(() => {
    const childrenRefs = React.Children.map(
      children,
      child => (child as any).ref
    )

    setChildRefs(childrenRefs.map(ref => ref.current))
  }, [children])

  useArcadeCollider(childRefs, childRefs, onCollide)

  return (children as unknown) as JSX.Element
  // useArcadeCollider(childRef, collideWith, onCollide, onProcess)

  // return children ? children(childRef) : null
}
