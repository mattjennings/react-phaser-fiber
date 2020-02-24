import { createGame } from '../../../../test-utils/createGame'
import { applyTintProps } from './applyTintProps'

describe('applyTintProps', () => {
  it('applies tint props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)
    jest.spyOn(instance, 'setTint')
    applyTintProps(
      instance,
      {},
      {
        tint: 1,
      }
    )

    expect(instance.setTint).toHaveBeenCalledWith(1)
  })

  it('applies tint corner props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)
    jest.spyOn(instance, 'setTint')
    applyTintProps(
      instance,
      {},
      {
        tint: {
          topLeft: 0.1,
          topRight: 0.2,
          bottomLeft: 0.3,
          bottomRight: 0.4,
        },
      }
    )

    expect(instance.setTint).toHaveBeenCalledWith(0.1, 0.2, 0.3, 0.4)
  })
  it('applies tintFill props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)
    jest.spyOn(instance, 'setTintFill')
    applyTintProps(
      instance,
      {},
      {
        tintFill: 1,
      }
    )

    expect(instance.setTintFill).toHaveBeenCalledWith(1)
  })

  it('applies tintFill corner props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)
    jest.spyOn(instance, 'setTintFill')
    applyTintProps(
      instance,
      {},
      {
        tintFill: {
          topLeft: 0.1,
          topRight: 0.2,
          bottomLeft: 0.3,
          bottomRight: 0.4,
        },
      }
    )

    expect(instance.setTintFill).toHaveBeenCalledWith(0.1, 0.2, 0.3, 0.4)
  })
})
