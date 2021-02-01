import { iterateProps } from '../../../util/iterateProps'
import { BlendModeProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.BlendMode
 */
export function applyBlendModeProps<
  T extends Phaser.GameObjects.Components.BlendMode
>(instance: T, oldProps: BlendModeProps, newProps: BlendModeProps) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
    switch (key) {
      case 'blendMode':
        instance.setBlendMode(newValue)
        break
    }
  })
}

function getProps(props: BlendModeProps) {
  const { blendMode } = props

  return {
    blendMode,
  }
}
