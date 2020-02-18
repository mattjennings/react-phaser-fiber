import { wait } from '@testing-library/react'
import applyProps from './applyProps'
import Phaser from 'phaser'

// Phaser doesn't allow a pure GameObject instance to be added to a scene so
// we'll be using the various Image, Sprite, etc. components to test out specific props
describe('applyProps', () => {
  it('applies transform props', async () => {
    const game = await createGame()

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
    const game = await createGame()

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
    const game = await createGame()

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
    const game = await createGame()

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
    const game = await createGame()

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

  it('applies bounce props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setBounce = jest.spyOn(instance, 'setBounce')
    const setCollideWorldBounds = jest.spyOn(instance, 'setCollideWorldBounds')

    applyProps(
      instance,
      {},
      {
        bounce: 1,
        collideWorldBounds: true,
        onWorldBounds: true,
      }
    )

    expect(setBounce).toHaveBeenCalledWith(1, 1)
    expect(setCollideWorldBounds).toHaveBeenCalledWith(true)
    expect(instance.body.onWorldBounds).toEqual(true)
  })

  it('applies debug props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)

    applyProps(
      instance,
      {},
      {
        debugBodyColor: 0x00,
        debugShowBody: true,
        debugShowVelocity: true,
      }
    )

    expect(instance.debugBodyColor).toEqual(0x00)
    expect(instance.debugShowBody).toEqual(true)
    expect(instance.debugShowVelocity).toEqual(true)
  })

  it('applies drag props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setDamping = jest.spyOn(instance, 'setDamping')
    const setDrag = jest.spyOn(instance, 'setDrag')
    // @ts-ignore - not in type defs, but is there
    const setAllowDrag = jest.spyOn(instance.body, 'setAllowDrag')

    applyProps(
      instance,
      {},
      {
        damping: 1,
        drag: 1,
        allowDrag: true,
      }
    )

    expect(setDamping).toHaveBeenCalledWith(1)
    expect(setDrag).toHaveBeenCalledWith(1, 1)
    expect(setAllowDrag).toHaveBeenCalledWith(true)
  })

  it('applies enable props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const disableBody = jest.spyOn(instance, 'disableBody')

    applyProps(
      instance,
      {},
      {
        disableBody: true,
        hideBody: true,
      }
    )

    expect(disableBody).toHaveBeenCalledWith(true, true)
  })

  it('applies friction props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setFriction = jest.spyOn(instance, 'setFriction')

    applyProps(
      instance,
      {},
      {
        friction: 1,
      }
    )

    expect(setFriction).toHaveBeenCalledWith(1, 1)
  })

  it('applies gravity props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setGravity = jest.spyOn(instance, 'setGravity')
    // @ts-ignore - not in type defs
    const setAllowGravity = jest.spyOn(instance.body, 'setAllowGravity')

    applyProps(
      instance,
      {},
      {
        gravity: 1,
        allowGravity: true,
      }
    )

    expect(setGravity).toHaveBeenCalledWith(1, 1)
    expect(setAllowGravity).toHaveBeenCalledWith(true)
  })

  it('applies immovable props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setImmovable = jest.spyOn(instance, 'setImmovable')

    applyProps(
      instance,
      {},
      {
        immovable: true,
      }
    )

    expect(setImmovable).toHaveBeenCalledWith(true)
  })

  it('applies immovable props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setImmovable = jest.spyOn(instance, 'setImmovable')

    applyProps(
      instance,
      {},
      {
        immovable: true,
      }
    )

    expect(setImmovable).toHaveBeenCalledWith(true)
  })

  it('applies immovable props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setMass = jest.spyOn(instance, 'setMass')

    applyProps(
      instance,
      {},
      {
        mass: 1,
      }
    )

    expect(setMass).toHaveBeenCalledWith(1)
  })

  it('applies size props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setCircle = jest.spyOn(instance, 'setCircle')
    const setOffset = jest.spyOn(instance, 'setOffset')
    const setSize = jest.spyOn(instance, 'setSize')

    applyProps(
      instance,
      {},
      {
        circle: {
          radius: 1,
          offsetX: 2,
          offsetY: 3,
        },
        offset: {
          x: 1,
          y: 2,
        },
        size: {
          width: 1,
          height: 2,
          center: 3,
        },
      }
    )

    expect(setCircle).toHaveBeenCalledWith(1, 2, 3)
    expect(setOffset).toHaveBeenCalledWith(1, 2)
    expect(setSize).toHaveBeenCalledWith(1, 2, 3)
  })

  it('applies velocity props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocity = jest.spyOn(instance, 'setVelocity')
    const setMaxVelocity = jest.spyOn(instance, 'setMaxVelocity')

    applyProps(
      instance,
      {},
      {
        velocity: 1,
        maxVelocity: 2,
      }
    )

    expect(setVelocity).toHaveBeenCalledWith(1, 1)
    expect(setMaxVelocity).toHaveBeenCalledWith(2, 2)
  })
})

async function createGame(config: Phaser.Types.Core.GameConfig = {}) {
  const game = new Phaser.Game({
    physics: {
      default: 'arcade',
    },
    type: Phaser.HEADLESS,
    banner: false,
    ...config,
  })

  await wait(() => {
    if (!game.isRunning) {
      throw 'Game not ready'
    }
  })

  return game
}
