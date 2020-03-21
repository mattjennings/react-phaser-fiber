import { iterateProps } from '../../../../util/iterateProps'
import { MatterTransformProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Transform
 *
 * It does not apply props in common with Phaser.GameObjects.Components.Transform, so
 * make sure you also use applyTransformProps
 */
export function applyMatterTransformProps<
  T extends Phaser.Physics.Matter.Components.Transform
>(instance: T, oldProps: MatterTransformProps, newProps: MatterTransformProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'fixedRotation':
        if (newValue === true) {
          instance.setFixedRotation()
        } else {
          // ?? is there supposed to be a way to undo fixed rotation?
        }
        break
    }
  })
}
