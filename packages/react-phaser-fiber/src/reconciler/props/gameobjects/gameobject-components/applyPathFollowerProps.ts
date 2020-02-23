import { PathFollowerProps } from '../../types'
import { iterateProps } from '../../iterateProps'
import isEqual from 'fast-deep-equal'

/**
 * Applies props for Phaser.GameObjects.Components.PathFollower
 */
export function applyPathFollowerProps<
  T extends Phaser.GameObjects.Components.PathFollower
>(instance: T, oldProps: PathFollowerProps, newProps: PathFollowerProps) {
  iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
    switch (key) {
      case 'path':
        instance.setPath(newValue as Phaser.Curves.Path)
        break
      case 'follow':
        // perform a deep equal so we don't keep calling startFollow from an un-memo'd object
        if (!isEqual(newValue, oldValue)) {
          if (newValue) {
            instance.startFollow(
              newValue as
                | Phaser.Types.GameObjects.PathFollower.PathConfig
                | Phaser.Types.Tweens.NumberTweenBuilderConfig
            )
          } else {
            instance.stopFollow()
          }
        }
        break
      case 'pauseFollow':
        if (newValue) {
          instance.pauseFollow()
        } else {
          instance.resumeFollow()
        }
        break
    }
  })
}
