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
  Point,
} from '../props'
import { initArcadePhysicsObject } from '../util/initArcadePhysicsObject'
import { iterateProps } from '../util/iterateProps'

export interface ArcadeGroupElementProps
  extends AlphaProps,
    DepthProps,
    OriginProps,
    TintProps,
    ArcadeVelocityProps {
  instance: Phaser.Physics.Arcade.Group
  scene: Phaser.Scene

  ref?: React.Ref<Phaser.Physics.Arcade.Group>
  active?: boolean
  name?: string
  runChildUpdate?: boolean
  children?: React.ReactNode

  scale?: number | Point
  angle?: number
  x?: number
  y?: number
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
    iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
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
        case 'angle':
          instance.angle(newValue as number)
          break
        case 'x':
          instance.setX(newValue as number)
          break
        case 'y':
          instance.setY(newValue as number)
          break
        case 'scale':
          if (typeof newValue === 'number') {
            instance.scaleXY(newValue)
          } else {
            const asPoint = newValue as Point
            instance.scaleXY(asPoint.x ?? 1, asPoint.y ?? 1)
          }
          break
      }
    })

    applyAlphaProps(instance as any, oldProps, newProps)
    applyDepthProps(instance as any, oldProps, newProps)
    applyOriginProps(instance as any, oldProps, newProps)
    applyTintProps(instance as any, oldProps, newProps)

    // arcade physics
    applyArcadeVelocityProps(instance as any, oldProps, newProps)
  },
}

function getProps(props: ArcadeGroupElementProps) {
  const { active, name, runChildUpdate, angle, x, y, scale } = props
  return { active, name, runChildUpdate, angle, x, y, scale }
}
