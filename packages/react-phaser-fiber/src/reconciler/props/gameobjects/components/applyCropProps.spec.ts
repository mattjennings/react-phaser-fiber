import { createGame } from '../../../../test-utils/createGame'
import { applyCropProps } from './applyCropProps'

describe('applyCropProps', () => {
  it('applies crop', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    const spy = jest.spyOn(instance, 'setCrop')
    applyCropProps(
      instance,
      {},
      {
        crop: {
          x: 10,
          y: 11,
          width: 12,
          height: 13,
        },
      }
    )

    expect(spy).toHaveBeenCalledWith(10, 11, 12, 13)
  })

  it('resets crop', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    const spy = jest.spyOn(instance, 'setCrop')
    applyCropProps(
      instance,
      {
        crop: {
          x: 10,
          y: 11,
          width: 12,
          height: 13,
        },
      },
      {
        crop: null,
      }
    )

    expect(spy).toHaveBeenCalledWith()
  })

  it('applies isCropped', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyCropProps(
      instance,
      {},
      {
        isCropped: true,
      }
    )

    expect(instance.isCropped).toEqual(true)

    applyCropProps(
      instance,
      {
        isCropped: true,
      },
      {
        isCropped: false,
      }
    )

    expect(instance.isCropped).toEqual(false)
  })
})
