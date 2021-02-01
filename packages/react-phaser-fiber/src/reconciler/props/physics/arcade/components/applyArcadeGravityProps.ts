import { ArcadeGravityProps } from '../types'
import isEqual from 'fast-deep-equal'
import { iterateProps } from '../../../../util/iterateProps'
import { Point } from '../../../types'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Gravity
 */
export function applyArcadeGravityProps<
  T extends Phaser.Physics.Arcade.Components.Gravity
>(instance: T, oldProps: ArcadeGravityProps, newProps: ArcadeGravityProps) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
      switch (key) {
        case 'gravity':
          if (typeof newValue === 'number') {
            instance.setGravity(newValue)
          } else if (!isEqual(newValue, oldValue)) {
            const { x, y } = newValue as Point
            instance.setGravity(x, y)
          }
          break
        case 'gravityX':
          instance.setGravityX(newValue as number)
          break
        case 'gravityY':
          instance.setGravityY(newValue as number)
          break
      }
    }
  )
}

function getProps(props: ArcadeGravityProps) {
  const { gravity, gravityX, gravityY } = props

  return {
    gravity,
    gravityX,
    gravityY,
  }
}
