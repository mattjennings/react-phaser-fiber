import { createGame } from '../../../../test-utils/createGame'
import { applyFlipProps } from './applyFlipProps'

describe('applyFlipProps', () => {
  it('applies flip', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyFlipProps(
      instance,
      {},
      {
        flipX: true,
        flipY: true,
      }
    )

    expect(instance.flipX).toEqual(true)
    expect(instance.flipY).toEqual(true)
  })
})
