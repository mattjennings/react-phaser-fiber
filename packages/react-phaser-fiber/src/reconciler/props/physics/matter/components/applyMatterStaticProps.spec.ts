import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterStaticProps } from './applyMatterStaticProps'

describe('applyMatterStaticProps', () => {
  it('applies setStatic', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setStatic')

    applyMatterStaticProps(
      instance,
      {},
      {
        static: true,
      }
    )

    expect(instance.setStatic).toHaveBeenCalledWith(true)
  })
})
