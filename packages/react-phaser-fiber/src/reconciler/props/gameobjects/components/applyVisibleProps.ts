import { VisibleProps } from '../types'
import { iterateProps } from '../../../util/iterateProps'

/**
 * Applies props for Phaser.GameObjects.Components.Visible
 */
export function applyVisibleProps<
  T extends Phaser.GameObjects.Components.Visible
>(instance: T, oldProps: VisibleProps, newProps: VisibleProps) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
    switch (key) {
      case 'visible':
        instance.setVisible(newValue)
        break
    }
  })
}

function getProps(props: VisibleProps) {
  const { visible } = props

  return {
    visible,
  }
}
