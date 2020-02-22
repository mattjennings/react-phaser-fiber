import { createGame } from '../../../test-utils/createGame'
import { applyComputedSizeProps } from './applyComputedSizeProps'

it('applies ComputedSize props', async () => {
  const game = await createGame()

  const scene = game.scene.add('123', {})
  const instance = scene.add.image(0, 0, null)

  applyComputedSizeProps(
    instance,
    {},
    {
      width: 10,
      height: 10,
      displayHeight: 100,
      displayWidth: 100,
    }
  )

  expect(instance.width).toEqual(10)
  expect(instance.height).toEqual(10)
  expect(instance.displayHeight).toEqual(100)
  expect(instance.displayWidth).toEqual(100)
})
