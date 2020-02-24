import React, { useMemo, useContext, useImperativeHandle } from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { GroupElementProps } from '../reconciler/elements/Group'

const GroupContext = React.createContext<Phaser.GameObjects.Group>(null)
const GroupElement = (TYPES.Group as unknown) as React.FC<GroupElementProps>

export type GroupProps = Omit<GroupElementProps, 'instance' | 'scene'>

function Group(props: GroupProps, ref: React.Ref<Phaser.GameObjects.Group>) {
  const scene = useScene()
  const instance = useMemo(() => new Phaser.GameObjects.Group(scene, []), [])

  useImperativeHandle(ref, () => instance)

  return (
    <GroupContext.Provider value={instance}>
      <GroupElement instance={instance} scene={scene} {...props} />
    </GroupContext.Provider>
  )
}

export default React.forwardRef(Group)

export function useGroup<T extends Phaser.GameObjects.Group>() {
  return useContext(GroupContext) as T
}
