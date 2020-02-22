import { createGame } from '../../../test-utils/createGame'
import { applyOriginProps } from './applyOriginProps'

describe('applyOriginProps', () => {
  it('applies origin props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyOriginProps(
      instance,
      {},
      {
        originX: 0.5,
        originY: 0.75,
      }
    )

    expect(instance.originX).toEqual(0.5)
    expect(instance.originY).toEqual(0.75)
  })

  it('applies displayOrigin props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyOriginProps(
      instance,
      {},
      {
        displayOriginX: 50,
        displayOriginY: 75,
      }
    )

    expect(instance.displayOriginX).toEqual(50)
    expect(instance.displayOriginY).toEqual(75)
  })
})
