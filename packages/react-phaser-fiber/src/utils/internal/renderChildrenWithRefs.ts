import React from 'react'

/**
 * Attachs refs from createChildrenRefs to each child component
 */
export function renderChildrenWithRefs(
  children: any,
  refs: React.RefObject<any>[]
) {
  return (React.Children.map(children, (child: any, index) =>
    React.cloneElement(child, {
      ref: refs[index],
    })
  ) as unknown) as JSX.Element
}
