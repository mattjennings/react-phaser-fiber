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
    // Todo
  })
}
