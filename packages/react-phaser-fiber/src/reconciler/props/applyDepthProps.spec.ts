import { createGame } from '../../test-utils/createGame'
import { applyDepthProps } from './applyDepthProps'

describe('applyDepthProps', () => {
  it('applies depth', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyDepthProps(
      instance,
      {},
      {
        depth: 10,
      }
    )

    expect(instance.depth).toEqual(10)
  })
})
