import React from 'react'
import { render, wait } from '@testing-library/react'
import { waitForRef } from '../../test-utils/waitForRef'
import Sprite from '../../components/Sprite'
import Game from '../../components/Game'
import Scene from '../../components/Scene'
import Image from '../../components/Image'
import { ArcadeImage } from '../../components'
import waitTime from 'waait'
import applyProps from './applyProps'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS} physics={{ default: 'arcade' }}>
    {props.children}
  </Game>
)

async function waitForGame(game: Phaser.Game) {
  await wait(() => {
    if (!game.isRunning) {
      throw 'Game not ready'
    }
  })
}

// Phaser doesn't allow a pure GameObject instance to be added to a scene so
// we'll be using the various Image, Sprite, etc. components to test out specific props
describe('applyProps', () => {
  it('applies transform props', async () => {
    const game = new Phaser.Game({
      physics: {
        default: 'arcade',
      },
      type: Phaser.HEADLESS,
      banner: false,
    })

    await waitForGame(game)

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyProps(
      instance,
      {},
      {
        x: 100,
        y: 100,
        angle: 100,
        scale: {
          x: 2,
          y: 4,
        },
        z: 2,
        w: 2,
      }
    )

    expect(instance.x).toEqual(100)
    expect(instance.y).toEqual(100)
    expect(instance.angle).toEqual(100)
    expect(instance.scale).toEqual(3)
    expect(instance.z).toEqual(2)
    expect(instance.w).toEqual(2)
  })

  it('applies visible props', async () => {
    const game = new Phaser.Game({
      physics: {
        default: 'arcade',
      },
      type: Phaser.HEADLESS,
      banner: false,
    })

    await waitForGame(game)

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyProps(
      instance,
      {},
      {
        visible: false,
      }
    )

    expect(instance.visible).toEqual(false)
  })

  it('applies animation props', async () => {
    const game = new Phaser.Game({
      physics: {
        default: 'arcade',
      },
      type: Phaser.HEADLESS,
      banner: false,
    })

    await waitForGame(game)

    const scene = game.scene.add('123', {})
    const instance = scene.add.sprite(0, 0, null)

    applyProps(
      instance,
      {},
      {
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

  it('applies acceleration props', async () => {
    const game = new Phaser.Game({
      physics: {
        default: 'arcade',
      },
      type: Phaser.HEADLESS,
      banner: false,
    })

    await waitForGame(game)

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const spy = jest.spyOn(instance, 'setAcceleration')

    applyProps(
      instance,
      {},
      {
        acceleration: {
          x: 1,
          y: 1,
        },
      }
    )

    expect(spy).toHaveBeenCalledWith(1, 1)
  })

  it('applies angular props', async () => {
    const game = new Phaser.Game({
      physics: {
        default: 'arcade',
      },
      type: Phaser.HEADLESS,
      banner: false,
    })

    await waitForGame(game)

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setAngularAcceleration = jest.spyOn(
      instance,
      'setAngularAcceleration'
    )
    const setAngularDrag = jest.spyOn(instance, 'setAngularDrag')
    const setAngularVelocity = jest.spyOn(instance, 'setAngularVelocity')

    applyProps(
      instance,
      {},
      {
        angularAcceleration: 1,
        angularDrag: 1,
        angularVelocity: 1,
      }
    )

    expect(setAngularAcceleration).toHaveBeenCalledWith(1)
    expect(setAngularDrag).toHaveBeenCalledWith(1)
    expect(setAngularVelocity).toHaveBeenCalledWith(1)
  })
})
