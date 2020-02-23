import { BounceProps, Point } from '../../../types'
import { iterateProps } from '../../../iterateProps'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Bounce
 */
export function applyArcadeBounceProps<
  T extends Phaser.Physics.Arcade.Components.Bounce
>(instance: T, oldProps: BounceProps, newProps: BounceProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'bounce':
        if (typeof newValue === 'number') {
          instance.setBounce(newValue as number)
        } else if (!isEqual(oldValue, newValue)) {
          const { x, y } = newValue as Point
          instance.setBounce(x, y)
        }
        break
      case 'bounceX':
        instance.setBounceX(newValue as number)
        break
      case 'bounceY':
        instance.setBounceY(newValue as number)
        break
      case 'collideWorldBounds':
        instance.setCollideWorldBounds(newValue as boolean)
        break
    }
  })
}
