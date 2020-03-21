import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterTransformProps } from './applyMatterTransformProps'

describe('applyMatterTransformProps', () => {
  it('applies fixedRotation', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })

    const instance = scene.matter.add.image(0, 0, null)

    jest.spyOn(instance, 'setFixedRotation')
    applyMatterTransformProps(
      instance,
      {},
      {
        fixedRotation: true,
      }
    )

    expect(instance.setFixedRotation).toHaveBeenCalledWith()
  })
})
