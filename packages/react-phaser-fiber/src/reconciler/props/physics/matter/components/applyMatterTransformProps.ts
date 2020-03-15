import { iterateProps } from '../../../../util/iterateProps'
import { Point } from '../../../types'
import { MatterTransformProps } from '../types'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.GameObjects.Components.Transform
 */
export function applyMatterTransformProps<
  T extends Phaser.GameObjects.Components.Transform & {
    body?: any
  }
>(instance: T, oldProps: MatterTransformProps, newProps: MatterTransformProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'angle':
        if (!isEqual(newValue, oldValue)) {
          instance.setAngle(newValue as number)
        }
        break
      case 'rotation':
        if (!isEqual(newValue, oldValue)) {
          instance.setRotation(newValue as number)
        }
        break
      case 'x':
        if (!isEqual(newValue, oldValue)) {
          instance.setX(newValue as number)
        }
        break
      case 'y':
        if (!isEqual(newValue, oldValue)) {
          instance.setY(newValue as number)
        }
        break
      case 'w':
        if (!isEqual(newValue, oldValue)) {
          instance.setW(newValue as number)
        }
        break
      case 'z':
        if (!isEqual(newValue, oldValue)) {
          instance.setZ(newValue as number)
        }
        break
      case 'scale':
        if (typeof newValue === 'number' && !isEqual(newValue, oldValue)) {
          instance.setScale(newValue)
        } else if (!isEqual(newValue, oldValue)) {
          // keeps ts happy
          const asPoint = (newValue as unknown) as Point & { point?: Point }

          instance.setScale(
            asPoint.x,
            asPoint.y,
            // @ts-ignore - point paramter (doesn't exist in typedefs) - https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.Components.Transform.html#setScale__anchor
            asPoint.point ? [asPoint.point.x, asPoint.point.y] : undefined
          )
        }

        if (instance.body?.physicsType === Phaser.Physics.Arcade.STATIC_BODY) {
          instance.body.updateFromGameObject()
        }
        break
    }
  })
}
