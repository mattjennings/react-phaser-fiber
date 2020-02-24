import { createGame } from '../../../../test-utils/createGame'
import { applyVisibleProps } from './applyVisibleProps'

describe('applyVisibleProps', () => {
  it('applies visible props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyVisibleProps(
      instance,
      {},
      {
        visible: false,
      }
    )

    expect(instance.visible).toEqual(false)
  })
})
