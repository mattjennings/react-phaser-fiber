import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterGravityProps } from './applyMatterGravityProps'

describe('applyMatterGravityProps', () => {
  it('applies ignoreGravity', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setIgnoreGravity')

    applyMatterGravityProps(
      instance,
      {},
      {
        ignoreGravity: true,
      }
    )

    expect(instance.setIgnoreGravity).toHaveBeenCalledWith(true)
  })
})
