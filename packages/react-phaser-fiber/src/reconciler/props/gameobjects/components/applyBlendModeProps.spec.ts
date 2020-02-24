import { createGame } from '../../../../test-utils/createGame'
import { applyBlendModeProps } from './applyBlendModeProps'

describe('applyBlendModeProps', () => {
  it('applies BlendMode props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyBlendModeProps(
      instance,
      {},
      {
        blendMode: Phaser.BlendModes.COLOR,
      }
    )

    expect(instance.blendMode).toEqual(Phaser.BlendModes.COLOR)
  })
})
