import { applyArcadeImmovableProps } from './applyArcadeImmovableProps'
import { createGame } from '../../../../../test-utils/createGame'

describe('applyArcadeImmovableProps', () => {
  it('applies immovable', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setImmovable = jest.spyOn(instance, 'setImmovable')

    applyArcadeImmovableProps(
      instance,
      {},
      {
        immovable: true,
      }
    )

    expect(setImmovable).toHaveBeenCalledWith(true)

    applyArcadeImmovableProps(
      instance,
      {
        immovable: true,
      },
      {
        immovable: false,
      }
    )

    expect(setImmovable).toHaveBeenCalledWith(false)
  })
})
