import { CreatePhaserComponentConfig } from '../element'
import {
  AlphaProps,
  applyAlphaProps,
  applyArcadeAccelerationProps,
  applyArcadeAngularProps,
  applyArcadeBodyProps,
  applyArcadeBounceProps,
  applyArcadeDebugProps,
  applyArcadeDragProps,
  applyArcadeEnableProps,
  applyArcadeFrictionProps,
  applyArcadeGravityProps,
  applyArcadeImmovableProps,
  applyArcadeMassProps,
  applyArcadeSizeProps,
  applyArcadeVelocityProps,
  applyDepthProps,
  applyOriginProps,
  applyTintProps,
  applyTransformProps,
  ArcadeAccelerationProps,
  ArcadeAngularProps,
  ArcadeBodyProps,
  ArcadeBounceProps,
  ArcadeDebugProps,
  ArcadeDragProps,
  ArcadeEnableProps,
  ArcadeFrictionProps,
  ArcadeGravityProps,
  ArcadeImmovableProps,
  ArcadeMassProps,
  ArcadeSizeProps,
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
    ArcadeAccelerationProps,
    ArcadeAngularProps,
    ArcadeBodyProps,
    ArcadeBounceProps,
    ArcadeDebugProps,
    ArcadeEnableProps,
    ArcadeDragProps,
    ArcadeFrictionProps,
    ArcadeGravityProps,
    ArcadeImmovableProps,
    ArcadeMassProps,
    ArcadeSizeProps,
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
  create: ({ instance, scene, physicsType }) => {
    initArcadePhysicsObject(instance, scene, physicsType)

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
    applyArcadeAccelerationProps(instance as any, oldProps, newProps)
    applyArcadeAngularProps(instance as any, oldProps, newProps)
    applyArcadeBounceProps(instance as any, oldProps, newProps)
    applyArcadeDebugProps(instance as any, oldProps, newProps)
    applyArcadeEnableProps(instance as any, oldProps, newProps)
    applyArcadeDragProps(instance as any, oldProps, newProps)
    applyArcadeFrictionProps(instance as any, oldProps, newProps)
    applyArcadeGravityProps(instance as any, oldProps, newProps)
    applyArcadeImmovableProps(instance as any, oldProps, newProps)
    applyArcadeMassProps(instance as any, oldProps, newProps)
    applyArcadeSizeProps(instance as any, oldProps, newProps)
    applyArcadeVelocityProps(instance as any, oldProps, newProps)
    applyArcadeBodyProps(instance as any, oldProps, newProps)
  },
}
