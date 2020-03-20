import { MatterBodyProps } from './types'
import { iterateProps } from '../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Matter.Body and Phaser.Physics.Matter.StaticBody
 */
export function applyMatterBodyProps<
  T extends {
    body: any
  }
>(instance: T, oldProps: MatterBodyProps, newProps: MatterBodyProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'allowGravity':
        // @ts-ignore - doesn't exist in type defs
        instance.body.setAllowGravity(newValue as boolean)
        break
      case 'allowDrag':
        // @ts-ignore - doesn't exist in type defs
        instance.body.setAllowDrag(newValue as boolean)
        break
      case 'allowRotation':
        // @ts-ignore - doesn't exist in type defs
        instance.body.allowRotation(newValue as boolean)
        break
      case 'onWorldBounds':
        ;(instance.body as Phaser.Physics.Arcade.Body).onWorldBounds = newValue as boolean
        break
      case 'collideWorldBounds':
        ;(instance.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(
          newValue as boolean
        )
        break
    }
  })
}
