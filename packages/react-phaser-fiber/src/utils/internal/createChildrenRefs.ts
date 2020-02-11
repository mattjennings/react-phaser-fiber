import React from 'react'

/**
 * Creates refs for each child component
 */
export function createChildrenRefs(children: any) {
  return React.Children.map(
    children,
    (child: any) => child.ref || React.createRef()
  ) as React.RefObject<any>[]
}
