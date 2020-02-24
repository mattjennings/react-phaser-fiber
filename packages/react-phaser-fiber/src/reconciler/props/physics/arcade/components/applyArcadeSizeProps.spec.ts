import { applyArcadeSizeProps } from './applyArcadeSizeProps'
import { createGame } from '../../../../../test-utils/createGame'

describe('applyArcadeSizeProps', () => {
  it('applies size', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setSize = jest.spyOn(instance, 'setSize')

    applyArcadeSizeProps(
      instance,
      {},
      {
        size: {
          width: 1,
          height: 2,
          center: 3,
        },
      }
    )

    expect(setSize).toHaveBeenCalledWith(1, 2, 3)
  })

  it('applies offset', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setOffset = jest.spyOn(instance, 'setOffset')

    applyArcadeSizeProps(
      instance,
      {},
      {
        offset: {
          x: 1,
          y: 2,
        },
      }
    )

    expect(setOffset).toHaveBeenCalledWith(1, 2)
  })

  it('applies circle', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setCircle = jest.spyOn(instance, 'setCircle')

    applyArcadeSizeProps(
      instance,
      {},
      {
        circle: {
          radius: 1,
          offsetX: 2,
          offsetY: 3,
        },
      }
    )

    expect(setCircle).toHaveBeenCalledWith(1, 2, 3)
  })
})
