import { wait } from '@testing-library/react'
import Phaser from 'phaser'
import { createGame } from '../../../../test-utils/createGame'
import { applyAnimationProps } from './applyAnimationProps'

describe('applyAnimationProps', () => {
  it('applies animation props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.sprite(0, 0, null)
    jest.spyOn(instance.anims, 'play')

    applyAnimationProps(
      instance,
      {},
      {
        animation: 'run',
        accumulator: 2,
        delay: 2,
        duration: 10,
        forward: false,
        isPlaying: false,
        msPerFrame: 100,
        skipMissedFrames: false,
        repeat: 5,
        repeatDelay: 10,
        timeScale: 10,
        yoyo: true,
      }
    )

    expect(instance.anims.play).toHaveBeenCalledWith('run', false)
    expect(instance.anims.accumulator).toEqual(2)
    expect(instance.anims.getDelay()).toEqual(2)
    expect(instance.anims.duration).toEqual(10)
    expect(instance.anims.forward).toEqual(false)
    expect(instance.anims.isPlaying).toEqual(false)
    expect(instance.anims.msPerFrame).toEqual(100)
    expect(instance.anims.skipMissedFrames).toEqual(false)
    expect(instance.anims.getRepeat()).toEqual(5)
    expect(instance.anims.getRepeatDelay()).toEqual(10)
    expect(instance.anims.getTimeScale()).toEqual(10)
    expect(instance.anims.getYoyo()).toEqual(true)
  })
})
