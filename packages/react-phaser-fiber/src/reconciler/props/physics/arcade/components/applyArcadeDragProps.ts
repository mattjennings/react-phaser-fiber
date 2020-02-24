import { ArcadeDragProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'
import isEqual from 'fast-deep-equal'
import { Point } from '../../../types'

/**
 * Applies props for Phaser.Physics.Arcade.Components.Drag
 */
export function applyArcadeDragProps<
  T extends Phaser.Physics.Arcade.Components.Drag
>(instance: T, oldProps: ArcadeDragProps, newProps: ArcadeDragProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'drag':
        if (typeof newValue === 'number') {
          instance.setDrag(newValue)
        } else if (!isEqual(newValue, oldValue)) {
          const { x, y } = newValue as Point
          instance.setDrag(x, y)
        }
        break
      case 'dragX':
        instance.setDragX(newValue as number)
        break
      case 'dragY':
        instance.setDragY(newValue as number)
        break
      case 'damping':
        instance.setDamping(newValue as boolean)
        break
    }
  })
}
