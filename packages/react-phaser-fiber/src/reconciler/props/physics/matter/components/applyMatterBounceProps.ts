import { MatterBounceProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'

interface Bounce {
  body: MatterJS.Body
}

type CustomBounce = Bounce & Phaser.Physics.Matter.Components.Bounce
/**
 * Applies props for Phaser.Physics.Matter.Components.Bounce
 */
export function applyMatterBounceProps<T extends CustomBounce>(
  instance: T,
  oldProps: MatterBounceProps,
  newProps: MatterBounceProps
) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'bounce':
        instance.setBounce(newValue as number)
        break
    }
  })
}
