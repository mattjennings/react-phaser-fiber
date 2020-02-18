import React, {
  useMemo,
  useContext,
  useLayoutEffect,
  useImperativeHandle,
} from 'react'
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

function Group(
  { children, ...props }: GroupProps,
  ref: React.Ref<Phaser.GameObjects.Group>
) {
  const scene = useScene()

  const group = useMemo(() => scene.add.group([]), [])

  useLayoutEffect(() => {
    return () => {
      group.destroy()
    }
  }, [])

  useImperativeHandle(ref, () => group)

  useLayoutEffect(() => {
    group.active = props.active
    group.defaultFrame = props.defaultFrame
    group.defaultKey = props.defaultKey
    group.isParent = props.isParent
    group.name = props.name
  }, [props])

  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>
}

export default React.forwardRef(Group)

export function useGroup<T extends Phaser.GameObjects.Group>() {
  return useContext(GroupContext) as T
}
