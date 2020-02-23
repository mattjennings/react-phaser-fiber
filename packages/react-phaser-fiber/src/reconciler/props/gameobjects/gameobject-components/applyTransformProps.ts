import { TransformProps, Point } from '../../types'
import { iterateProps } from '../../iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.Transform
 */
export function applyTransformProps<
  T extends Phaser.GameObjects.Components.Transform & {
    body?: any
  }
>(instance: T, oldProps: TransformProps, newProps: TransformProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'angle':
        instance.setAngle(newValue as number)
        break
      case 'rotation':
        instance.setRotation(newValue as number)
        break
      case 'x':
        instance.setX(newValue as number)
        break
      case 'y':
        instance.setY(newValue as number)
        break
      case 'w':
        instance.setW(newValue as number)
        break
      case 'z':
        instance.setZ(newValue as number)
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
