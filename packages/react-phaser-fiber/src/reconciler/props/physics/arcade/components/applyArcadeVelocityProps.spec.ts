import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeVelocityProps } from './applyArcadeVelocityProps'

describe('applyArcadeVelocityProps', () => {
  it('applies velocity as number', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocity = jest.spyOn(instance, 'setVelocity')

    applyArcadeVelocityProps(
      instance,
      {},
      {
        velocity: 1,
      }
    )

    expect(setVelocity).toHaveBeenCalledWith(1)
  })

  it('applies velocity as point', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocity = jest.spyOn(instance, 'setVelocity')

    applyArcadeVelocityProps(
      instance,
      {},
      {
        velocity: {
          x: 1,
          y: 2,
        },
      }
    )

    expect(setVelocity).toHaveBeenCalledWith(1, 2)
  })

  it('applies maxVelocity as number', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setMaxVelocity = jest.spyOn(instance, 'setMaxVelocity')

    applyArcadeVelocityProps(
      instance,
      {},
      {
        maxVelocity: 1,
      }
    )

    expect(setMaxVelocity).toHaveBeenCalledWith(1)
  })

  it('applies maxVelocity as point', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setMaxVelocity = jest.spyOn(instance, 'setMaxVelocity')

    applyArcadeVelocityProps(
      instance,
      {},
      {
        maxVelocity: {
          x: 1,
          y: 2,
        },
      }
    )

    expect(setMaxVelocity).toHaveBeenCalledWith(1, 2)
  })

  it('applies velocityX and velocityY', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocityX = jest.spyOn(instance, 'setVelocityX')
    const setVelocityY = jest.spyOn(instance, 'setVelocityY')

    applyArcadeVelocityProps(
      instance,
      {},
      {
        velocityX: 1,
        velocityY: 2,
      }
    )

    expect(setVelocityX).toHaveBeenCalledWith(1)
    expect(setVelocityY).toHaveBeenCalledWith(2)
  })
})
