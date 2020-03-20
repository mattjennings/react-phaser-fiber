import { MatterCollisionProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Matter.Components.Collision
 */
export function applyMatterCollisionProps<
  T extends Phaser.Physics.Matter.Components.Collision
>(instance: T, oldProps: MatterCollisionProps, newProps: MatterCollisionProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'collidesWith':
        instance.setCollidesWith(newValue)
        break
      case 'collisionCategory':
        instance.setCollisionCategory(newValue as number)
        break
      case 'collisionGroup':
        instance.setCollisionGroup(newValue as number)
        break
    }
  })
}
