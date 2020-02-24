import { createGame } from '../../../test-utils/createGame'
import { applyGameObjectProps } from './applyGameObjectProps'

describe('applyGameObjectProps', () => {
  it('applies mass props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setMass = jest.spyOn(instance, 'setMass')

    applyGameObjectProps(
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

    applyGameObjectProps(
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

    applyGameObjectProps(
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
