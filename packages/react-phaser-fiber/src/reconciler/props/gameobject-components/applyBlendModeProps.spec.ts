import { createGame } from '../../../test-utils/createGame'
import { applyBlendModeProps } from './applyBlendModeProps'

it('applies Blend Mode props', async () => {
  const game = await createGame()

  const scene = game.scene.add('123', {})
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
