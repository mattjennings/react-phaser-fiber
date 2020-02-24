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
} from '../props'
import { iterateProps } from '../util/iterateProps'

export interface GroupElementProps
  extends AlphaProps,
    DepthProps,
    OriginProps,
    TintProps,
    TransformProps {
  instance: Phaser.GameObjects.Group
  scene: Phaser.Scene
  ref?: React.Ref<Phaser.GameObjects.Group>
  active?: boolean
  name?: string
  children?: React.ReactNode
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
      }
    })

    applyAlphaProps(instance as any, oldProps, newProps)
    applyDepthProps(instance as any, oldProps, newProps)
    applyOriginProps(instance as any, oldProps, newProps)
    applyTintProps(instance as any, oldProps, newProps)
    applyTransformProps(instance as any, oldProps, newProps)
  },
}
