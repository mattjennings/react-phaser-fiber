import { createGame } from '../../../../test-utils/createGame'
import { applyScrollFactorProps } from './applyScrollFactorProps'

describe('applyScrollFactorProps', () => {
  it('applies ScrollFactor props', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyScrollFactorProps(
      instance,
      {},
      {
        scrollFactorX: 0.5,
        scrollFactorY: 0.75,
      }
    )

    expect(instance.scrollFactorX).toEqual(0.5)
    expect(instance.scrollFactorY).toEqual(0.75)
  })
})
