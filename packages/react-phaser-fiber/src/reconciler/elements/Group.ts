import { applyCommonProps, TransformProps } from '../props'
import { CreatePhaserComponentConfig } from '../element'
import { assignSceneKey } from '../assignSceneKey'

export interface GroupProps extends TransformProps {
  scene: Phaser.Scene
  instance: Phaser.GameObjects.Group
  active?: boolean
  defaultFrame?: number
  defaultKey?: string
  isParent?: boolean
  name?: string
  children?: React.ReactNode
}

const Group: CreatePhaserComponentConfig<
  Phaser.GameObjects.Group,
  GroupProps
> = {
  create: ({ instance, scene }) => {
    assignSceneKey(instance, scene)
    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    applyCommonProps(instance, oldProps, newProps)
  },
}

export default Group
