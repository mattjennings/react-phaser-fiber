import { CreatePhaserComponentConfig } from '../element'
import {
  AlphaProps,
  applyAlphaProps,
  applyArcadeVelocityProps,
  applyDepthProps,
  applyOriginProps,
  applyTintProps,
  applyTransformProps,
  ArcadeVelocityProps,
  DepthProps,
  OriginProps,
  TintProps,
  TransformProps,
} from '../props'
import { initArcadePhysicsObject } from '../util/initArcadePhysicsObject'
import { iterateProps } from '../util/iterateProps'

export interface ArcadeGroupElementProps
  extends AlphaProps,
    DepthProps,
    OriginProps,
    TintProps,
    TransformProps,
    ArcadeVelocityProps {
  instance: Phaser.Physics.Arcade.Group
  scene: Phaser.Scene

  ref?: React.Ref<Phaser.Physics.Arcade.Group>
  active?: boolean
  name?: string
  runChildUpdate?: boolean
  children?: React.ReactNode
}

export const ArcadeGroupElement: CreatePhaserComponentConfig<
  Phaser.Physics.Arcade.Group,
  ArcadeGroupElementProps
> = {
  create: ({ instance, scene }) => {
    initArcadePhysicsObject(instance, scene, 'dynamic')

    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    // apply group props
    iterateProps(oldProps, newProps, (key, newValue) => {
      switch (key) {
        case 'active':
          instance.active = newValue as boolean
          break
        case 'name':
          instance.name = newValue as string
          break
        case 'runChildUpdate':
          instance.runChildUpdate = newValue as boolean
          break
      }
    })

    applyAlphaProps(instance as any, oldProps, newProps)
    applyDepthProps(instance as any, oldProps, newProps)
    applyOriginProps(instance as any, oldProps, newProps)
    applyTintProps(instance as any, oldProps, newProps)
    applyTransformProps(instance as any, oldProps, newProps)

    // arcade physics
    applyArcadeVelocityProps(instance as any, oldProps, newProps)
  },
}
