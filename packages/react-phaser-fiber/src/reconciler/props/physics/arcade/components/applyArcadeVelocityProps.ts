import { ArcadeVelocityProps } from '../types'
import isEqual from 'fast-deep-equal'
import { iterateProps } from '../../../../util/iterateProps'
import { Point } from '../../../types'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Velocity
 */
export function applyArcadeVelocityProps<
  T extends Phaser.Physics.Arcade.Components.Velocity
>(instance: T, oldProps: ArcadeVelocityProps, newProps: ArcadeVelocityProps) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
      switch (key) {
        case 'velocity':
          if (typeof newValue === 'number') {
            instance.setVelocity(newValue)
          } else if (!isEqual(newValue, oldValue)) {
            const { x, y } = newValue as Point
            instance.setVelocity(x, y)
          }
          break
        case 'maxVelocity':
          if (typeof newValue === 'number') {
            instance.setMaxVelocity(newValue)
          } else if (!isEqual(newValue, oldValue)) {
            const { x, y } = newValue as Point
            instance.setMaxVelocity(x, y)
          }
          break
        case 'velocityX':
          instance.setVelocityX(newValue as number)
          break
        case 'velocityY':
          instance.setVelocityY(newValue as number)
          break
      }
    }
  )
}

function getProps(props: ArcadeVelocityProps) {
  const { velocity, velocityX, velocityY, maxVelocity } = props

  return {
    velocity,
    velocityX,
    velocityY,
    maxVelocity,
  }
}
