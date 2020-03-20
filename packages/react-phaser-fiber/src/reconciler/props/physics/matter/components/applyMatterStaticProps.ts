import { MatterStaticProps } from '../types'
import { iterateProps } from '../../../../util/iterateProps'

/**
 * Applies props for Phaser.Physics.Matter.Components.Static
 */
export function applyMatterStaticProps<
  T extends Phaser.Physics.Matter.Components.Static
>(instance: T, oldProps: MatterStaticProps, newProps: MatterStaticProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'static':
        instance.setStatic(newValue as boolean)
        break
    }
  })
}
