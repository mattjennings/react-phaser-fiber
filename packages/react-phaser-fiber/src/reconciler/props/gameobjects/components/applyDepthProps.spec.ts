import { createGame } from '../../../../test-utils/createGame'
import { applyDepthProps } from './applyDepthProps'

describe('applyDepthProps', () => {
  it('applies depth', async () => {
    const { game, scene } = await createGame()

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
