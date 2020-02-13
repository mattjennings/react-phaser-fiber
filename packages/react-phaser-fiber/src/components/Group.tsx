import React, { useMemo, useContext, useLayoutEffect } from 'react'
import { useScene } from '../hooks/useScene'

const GroupContext = React.createContext<Phaser.GameObjects.Group>(null)

export interface GroupProps {
  active?: boolean
  defaultFrame?: number
  defaultKey?: string
  isParent?: boolean
  name?: string
  children?: React.ReactNode
}

export default function Group({ children, ...props }: GroupProps) {
  const scene = useScene()

  const group = useMemo(() => scene.add.group([]), [])

  useLayoutEffect(() => {
    return () => {
      group.destroy()
    }
  }, [])

  useLayoutEffect(() => {
    group.active = props.active
    group.defaultFrame = props.defaultFrame
    group.defaultKey = props.defaultKey
    group.isParent = props.isParent
    group.name = props.name
  }, [props])

  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>
}

export function useGroup<T extends Phaser.GameObjects.Group>() {
  return useContext(GroupContext) as T
}
