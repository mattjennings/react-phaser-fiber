import { iterateProps } from '../../../util/iterateProps'
import { DepthProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Depth
 */
export function applyDepthProps<T extends Phaser.GameObjects.Components.Depth>(
  instance: T,
  oldProps: DepthProps,
  newProps: DepthProps
) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
    switch (key) {
      case 'depth':
        instance.setDepth(newValue)
        break
    }
  })
}

function getProps(props: DepthProps) {
  const { depth } = props

  return {
    depth,
  }
}
