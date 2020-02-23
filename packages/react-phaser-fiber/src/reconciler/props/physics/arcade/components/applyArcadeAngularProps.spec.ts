import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeAngularProps } from './applyArcadeAngularProps'

describe('applyArcadeAngularProps', () => {
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

    applyArcadeAngularProps(
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
})
