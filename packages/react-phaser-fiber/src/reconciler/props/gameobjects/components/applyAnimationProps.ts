import { iterateProps } from '../../../util/iterateProps'
import { AnimationProps } from '../types'

/**
 * Applies props for Phaser.GameObjects.Components.Animation
 */
export function applyAnimationProps<
  T extends { anims: Phaser.GameObjects.Components.Animation }
>(instance: T, oldProps: AnimationProps, newProps: AnimationProps) {
  iterateProps(getProps(oldProps), getProps(newProps), (key, newValue) => {
    switch (key) {
      case 'accumulator':
        instance.anims.accumulator = newValue as number
        break
      case 'animation':
        const ignoreIfPlaying = instance.anims.currentAnim?.key === newValue
        instance.anims.play(newValue as string, ignoreIfPlaying, 0)
        break
      case 'delay':
        instance.anims.setDelay(newValue as number)
        break
      case 'duration':
        instance.anims.duration = newValue as number
        break
      case 'forward':
        instance.anims.forward = newValue as boolean
        break
      case 'frameRate':
        instance.anims.frameRate = newValue as number
        break
      case 'isPlaying':
        instance.anims.isPlaying = newValue as boolean
        break
      case 'msPerFrame':
        instance.anims.msPerFrame = newValue as number
        break
      case 'skipMissedFrames':
        instance.anims.skipMissedFrames = newValue as boolean
        break
      case 'progress':
        instance.anims.setProgress(newValue as number)
        break
      case 'stopOnFrame':
        instance.anims.stopOnFrame(newValue as Phaser.Animations.AnimationFrame)
        break
      case 'stopAfterDelay':
        instance.anims.stopAfterDelay(newValue as number)
        break
      case 'repeat':
        instance.anims.setRepeat(newValue as number)
        break
      case 'repeatDelay':
        instance.anims.setRepeatDelay(newValue as number)
        break
      case 'timeScale':
        instance.anims.setTimeScale(newValue as number)
        break
      case 'yoyo':
        instance.anims.setYoyo(newValue as boolean)
        break
    }
  })
}

function getProps(props: AnimationProps) {
  const {
    accumulator,
    animation,
    delay,
    duration,
    forward,
    frameRate,
    isPlaying,
    msPerFrame,
    skipMissedFrames,
    progress,
    stopOnFrame,
    stopAfterDelay,
    repeat,
    repeatDelay,
    timeScale,
    yoyo,
  } = props

  return {
    accumulator,
    animation,
    delay,
    duration,
    forward,
    frameRate,
    isPlaying,
    msPerFrame,
    skipMissedFrames,
    progress,
    stopOnFrame,
    stopAfterDelay,
    repeat,
    repeatDelay,
    timeScale,
    yoyo,
  }
}
