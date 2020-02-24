import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeAccelerationProps } from './applyArcadeAccelerationProps'

describe('applyArcadeAccelerationProps', () => {
  it('applies acceleration', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const spy = jest.spyOn(instance, 'setAcceleration')

    applyArcadeAccelerationProps(
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

  it('applies accelerationX', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const spy = jest.spyOn(instance, 'setAccelerationX')

    applyArcadeAccelerationProps(
      instance,
      {},
      {
        accelerationX: 1,
      }
    )

    expect(spy).toHaveBeenCalledWith(1)
  })

  it('applies accelerationY', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const spy = jest.spyOn(instance, 'setAccelerationY')

    applyArcadeAccelerationProps(
      instance,
      {},
      {
        accelerationY: 1,
      }
    )

    expect(spy).toHaveBeenCalledWith(1)
  })
})
