import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeGravityProps } from './applyArcadeGravityProps'

describe('applyArcadeGravityProps', () => {
  it('applies gravity as number', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setGravity = jest.spyOn(instance, 'setGravity')

    applyArcadeGravityProps(
      instance,
      {},
      {
        gravity: 1,
      }
    )

    expect(setGravity).toHaveBeenCalledWith(1)
  })

  it('applies gravity as point', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setGravity = jest.spyOn(instance, 'setGravity')

    applyArcadeGravityProps(
      instance,
      {},
      {
        gravity: {
          x: 1,
          y: 2,
        },
      }
    )

    expect(setGravity).toHaveBeenCalledWith(1, 2)
  })

  it('applies gravityX and gravityY', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setGravityX = jest.spyOn(instance, 'setGravityX')
    const setGravityY = jest.spyOn(instance, 'setGravityY')

    applyArcadeGravityProps(
      instance,
      {},
      {
        gravityX: 1,
        gravityY: 2,
      }
    )

    expect(setGravityX).toHaveBeenCalledWith(1)
    expect(setGravityY).toHaveBeenCalledWith(2)
  })
})
