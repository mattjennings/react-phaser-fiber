import React from 'react'
import { CreatePhaserComponentConfig } from '../element'
import {
  AlphaProps,
  applyAlphaProps,
  applyDepthProps,
  applyOriginProps,
  applyTintProps,
  applyTransformProps,
  DepthProps,
  OriginProps,
  TintProps,
  TransformProps,
  Point,
} from '../props'
import { iterateProps } from '../util/iterateProps'

export interface GroupElementProps
  extends AlphaProps,
    DepthProps,
    OriginProps,
    TintProps {
  instance: Phaser.GameObjects.Group
  scene: Phaser.Scene
  ref?: React.Ref<Phaser.GameObjects.Group>
  active?: boolean
  name?: string
  runChildUpdate?: boolean
  children?: React.ReactNode
  scale?: number | Point
  angle?: number
  x?: number
  y?: number
}

export const GroupElement: CreatePhaserComponentConfig<
  Phaser.GameObjects.Group,
  GroupElementProps
> = {
  create: ({ instance }) => {
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
  },
}
