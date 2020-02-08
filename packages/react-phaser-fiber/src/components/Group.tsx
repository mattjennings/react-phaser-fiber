import Phaser from 'phaser'
import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { useScene } from '../hooks'
import isRefObject from '../utils/helpers/isRefObject'

export interface GroupProps
  extends Partial<
    Pick<
      Phaser.Types.GameObjects.Group.GroupConfig,
      | 'active'
      | 'classType'
      | 'defaultFrame'
      | 'defaultKey'
      | 'maxSize'
      | 'name'
      | 'runChildUpdate'
    >
  > {
  visible?: boolean
  children?: JSX.Element | JSX.Element[]
  onCreate?: Phaser.Types.GameObjects.Group.GroupConfig['createCallback']
  onRemove?: Phaser.Types.GameObjects.Group.GroupConfig['removeCallback']
}

// I'm not entirely sure if it makes sense to even have this implemented as a component
/**
 * Creates a Phaser.GameObjects.Group component
 */
function Group(
  { children, onCreate, onRemove, ...props }: GroupProps,
  ref: React.Ref<Phaser.GameObjects.Group>
) {
  const scene = useScene()
  const groupRef = useRef<Phaser.GameObjects.Group>(null)
  const childrenAsArray = Array.isArray(children) ? children : [children]
  const childRefs = useMemo(
    () =>
      childrenAsArray.map(() =>
        React.createRef<Phaser.GameObjects.GameObject>()
      ),
    [children]
  )

  useLayoutEffect(() => {
    const group = new Phaser.GameObjects.Group(
      scene,
      childRefs.map(ref => ref.current),
      {
        ...props,
        createCallback: onCreate,
        removeCallback: onRemove,
      }
    )

    // @ts-ignore
    groupRef.current = group

    if (ref) {
      if (isRefObject(ref)) {
        //@ts-ignore
        ref.current = group
      } else {
        ref(group)
      }
    }

    return () => {
      group.destroy()
    }
  }, [children])

  return (React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      ref: childRefs[index],
    })
  ) as unknown) as JSX.Element
}

export default React.forwardRef(Group)
