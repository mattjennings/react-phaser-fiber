import { createGame } from '../../../test-utils/createGame'
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
        alphaBottomLeft: 0.1,
        alphaBottomRight: 0.2,
        alphaTopLeft: 0.3,
        alphaTopRight: 0.4,
      }
    )

    expect(instance.alphaBottomLeft).toEqual(0.1)
    expect(instance.alphaBottomRight).toEqual(0.2)
    expect(instance.alphaTopLeft).toEqual(0.3)
    expect(instance.alphaTopRight).toEqual(0.4)
  })

  it('does not apply alpha corner props if a value is missing', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyAlphaProps(
      instance,
      {},
      {
        alphaBottomLeft: 0.12,
        alphaBottomRight: 0.2,
        alphaTopLeft: 0.3,
      }
    )

    expect(instance.alphaBottomLeft).toEqual(1)
    expect(instance.alphaBottomRight).toEqual(1)
    expect(instance.alphaTopLeft).toEqual(1)
    expect(instance.alphaTopRight).toEqual(1)
  })
})
