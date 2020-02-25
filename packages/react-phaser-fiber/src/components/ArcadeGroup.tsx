import * as Phaser from 'phaser'
import React, {
  useImperativeHandle,
  useMemo,
  useState,
  useLayoutEffect,
} from 'react'
import { useScene } from '../hooks/useScene'
import { TYPES } from '../reconciler/element'
import { ArcadeGroupElementProps } from '../reconciler/elements/ArcadeGroup'
import { GroupContext } from '../hooks/useGroup'

const ArcadeGroupElement = (TYPES.ArcadeGroup as unknown) as React.FC<
  ArcadeGroupElementProps
>

export interface ArcadeGroupProps
  extends Omit<ArcadeGroupElementProps, 'instance' | 'scene'> {
  instance?: Phaser.Physics.Arcade.Group
}

function ArcadeGroup(
  props: ArcadeGroupProps,
  ref: React.Ref<Phaser.Physics.Arcade.Group>
) {
  const scene = useScene()
  const instance = useMemo(
    () => new Phaser.Physics.Arcade.Group(scene.physics.world, scene, []),
    []
  )
  useImperativeHandle(ref, () => instance)

  // phaser groups don't apply its properties to new children, and the group is created
  // before the children are added, so we need to wait until the children are added before
  // assigning the props
  const [shouldSetProps, setShouldSetProps] = useState(false)

  useLayoutEffect(() => {
    setShouldSetProps(true)
  }, [])

  return (
    <GroupContext.Provider value={instance}>
      <ArcadeGroupElement
        scene={scene}
        instance={instance}
        {...(shouldSetProps ? props : {})}
      />
    </GroupContext.Provider>
  )
}

export default React.forwardRef(ArcadeGroup)
