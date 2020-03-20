import {
  MatterSetBodyProps,
  MatterCircleProps,
  MatterRectangleProps,
  MatterPolygonProps,
  MatterTrapezoidProps,
} from '../types'
import { Point } from '../../../types'
import { iterateProps } from '../../../../util/iterateProps'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.Physics.Matter.Components.SetBody
 */
export function applyMatterSetBodyProps<
  T extends Phaser.Physics.Matter.Components.SetBody
>(instance: T, oldProps: MatterSetBodyProps, newProps: MatterSetBodyProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    if (!isEqual(newValue, oldValue)) {
      switch (key) {
        case 'circle':
          {
            const { radius, options } = newValue as MatterCircleProps
            instance.setCircle(radius, options)
          }
          break
        case 'rectangle':
          {
            const { width, height, options } = newValue as MatterRectangleProps
            instance.setRectangle(width, height, options)
          }
          break
        case 'polygon':
          {
            const { radius, sides, options } = newValue as MatterPolygonProps
            instance.setPolygon(radius, sides, options)
          }
          break
        case 'trapezoid':
          const {
            width,
            height,
            slope,
            options,
          } = newValue as MatterTrapezoidProps
          instance.setTrapezoid(width, height, slope, options)
          break
      }
    }
  })
}
