import { applyArcadeMassProps } from './applyArcadeMassProps'
import { createGame } from '../../../../../test-utils/createGame'

describe('applyArcadeMassProps', () => {
  it('applies mass', async () => {
    const { game, scene } = await createGame()

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
