import { TransformProps, Point } from './types'

import invariant from 'fbjs/lib/invariant'
import { iterateProps } from './iterateProps'

export function applyCommonProps(
  instance: any,
  oldProps: TransformProps,
  newProps: TransformProps
) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'allowRotation':
        invariant(
          !instance.body,
          'Cannot set prop `allowRotation` on a GameObject without a Physics body'
        )
        if (instance.body) {
          instance.body.allowRotation = newValue
        }
        break
      case 'angle':
        instance.setAngle(newValue)
        break
      case 'rotation':
        instance.setRotation(newValue)
        break
      case 'x':
        instance.setX(newValue)
        break
      case 'y':
        instance.setY(newValue)
        break
      case 'w':
        instance.setW(newValue)
        break
      case 'z':
        instance.setZ(newValue)
        break
      case 'scale':
        if (typeof newValue === 'number') {
          instance.setScale(newValue)
        } else {
          // keeps ts happy
          const asPoint = (newValue as unknown) as Point & { point?: Point }

          instance.setScale(
            asPoint.x,
            asPoint.y,
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
