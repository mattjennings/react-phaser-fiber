import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterVelocityProps } from './applyMatterVelocityProps'

describe('applyMatterVelocityProps', () => {
  it('applies velocity as number', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocity = jest.spyOn(instance, 'setVelocity')

    applyMatterVelocityProps(
      instance,
      {},
      {
        velocity: 1,
      }
    )

    expect(setVelocity).toHaveBeenCalledWith(1)
  })

  it('applies velocity as point', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocity = jest.spyOn(instance, 'setVelocity')

    applyMatterVelocityProps(
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

  it('applies velocityX and velocityY', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocityX = jest.spyOn(instance, 'setVelocityX')
    const setVelocityY = jest.spyOn(instance, 'setVelocityY')

    applyMatterVelocityProps(
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

  it('applies angularVelocity', async () => {
    const { scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    jest.spyOn(instance, 'setAngularVelocity')

    applyMatterVelocityProps(
      instance,
      {},
      {
        angularVelocity: 1,
      }
    )

    expect(instance.setAngularVelocity).toHaveBeenCalledWith(1)
  })
})
