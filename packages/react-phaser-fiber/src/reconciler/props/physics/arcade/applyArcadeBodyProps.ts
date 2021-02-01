import { ArcadeBodyProps } from './types'
import { iterateProps } from '../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Arcade.Body and Phaser.Physics.Arcade.StaticBody
 */
export function applyArcadeBodyProps<
  T extends {
    body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody
  }
>(instance: T, oldProps: ArcadeBodyProps, newProps: ArcadeBodyProps) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
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
          instance.body.allowRotation = newValue
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
    }
  )
}

function getProps(props: ArcadeBodyProps) {
  const {
    allowGravity,
    allowDrag,
    allowRotation,
    onWorldBounds,
    collideWorldBounds,
  } = props

  return {
    allowGravity,
    allowDrag,
    allowRotation,
    onWorldBounds,
    collideWorldBounds,
  }
}
