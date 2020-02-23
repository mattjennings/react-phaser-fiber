import { createGame } from '../../../../test-utils/createGame'
import { applyAlphaProps } from './applyAlphaProps'

describe('applyAlphaProps', () => {
  it('applies alpha props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyAlphaProps(
      instance,
      {},
      {
        alpha: 1,
      }
    )

    expect(instance.alpha).toEqual(1)
  })

  it('applies alpha corner props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyAlphaProps(
      instance,
      {},
      {
        alpha: {
          bottomLeft: 0.1,
          bottomRight: 0.2,
          topLeft: 0.3,
          topRight: 0.4,
        },
      }
    )

    expect(instance.alphaBottomLeft).toEqual(0.1)
    expect(instance.alphaBottomRight).toEqual(0.2)
    expect(instance.alphaTopLeft).toEqual(0.3)
    expect(instance.alphaTopRight).toEqual(0.4)
  })
})
