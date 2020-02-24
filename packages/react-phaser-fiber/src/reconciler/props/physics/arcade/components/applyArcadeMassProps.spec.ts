import { applyArcadeMassProps } from './applyArcadeMassProps'
import { createGame } from '../../../../../test-utils/createGame'

describe('applyArcadeMassProps', () => {
  it('applies mass', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setMass = jest.spyOn(instance, 'setMass')

    applyArcadeMassProps(
      instance,
      {},
      {
        mass: 1,
      }
    )

    expect(setMass).toHaveBeenCalledWith(1)
  })
})
