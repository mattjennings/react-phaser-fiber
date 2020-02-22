import { iterateProps } from '../iterateProps'
import { PipelineProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Pipeline
 */
export function applyPipelineProps<
  T extends Phaser.GameObjects.Components.Pipeline
>(instance: T, oldProps: PipelineProps, newProps: PipelineProps) {
  iterateProps(oldProps, newProps, (key, newValue) => {
    switch (key) {
      case 'pipeline':
        instance.setPipeline(newValue)
        break
    }
  })
}
