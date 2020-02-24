import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeFrictionProps } from './applyArcadeFrictionProps'

describe('applyArcadeFrictionProps', () => {
  it('applies friction as number', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setFriction = jest.spyOn(instance, 'setFriction')

    applyArcadeFrictionProps(
      instance,
      {},
      {
        friction: 1,
      }
    )

    expect(setFriction).toHaveBeenCalledWith(1)
  })

  it('applies friction as point', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setFriction = jest.spyOn(instance, 'setFriction')

    applyArcadeFrictionProps(
      instance,
      {},
      {
        friction: {
          x: 1,
          y: 2,
        },
      }
    )

    expect(setFriction).toHaveBeenCalledWith(1, 2)
  })

  it('applies frictionX and frictionY', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setFrictionX = jest.spyOn(instance, 'setFrictionX')
    const setFrictionY = jest.spyOn(instance, 'setFrictionY')

    applyArcadeFrictionProps(
      instance,
      {},
      {
        frictionX: 1,
        frictionY: 2,
      }
    )

    expect(setFrictionX).toHaveBeenCalledWith(1)
    expect(setFrictionY).toHaveBeenCalledWith(2)
  })
})
