import React, { useRef } from 'react'
import useArcadeCollider from '../../hooks/useArcadeCollider'

export interface ArcadeColliderProps {
  collideWith: React.RefObject<any>[]
  children: (ref: React.Ref<any>) => JSX.Element
  onCollide?: (obj1: any, obj2: any) => any
  onProcess?: (obj1: any, obj2: any) => any
}

export default function ArcadeCollider({
  children,
  collideWith,
  onCollide,
  onProcess,
}: ArcadeColliderProps): JSX.Element {
  const childRef = useRef(null)

  useArcadeCollider(childRef, collideWith, onCollide, onProcess)

  return children ? children(childRef) : null
}
