import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterSleepProps } from './applyMatterSleepProps'

describe('applyMatterSleepProps', () => {
  it('applies sleep', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setSleepEvents')
    jest.spyOn(instance, 'setSleepThreshold')

    applyMatterSleepProps(
      instance,
      {},
      {
        sleep: {
          start: true,
          end: true,
          threshold: 5,
        },
      }
    )

    expect(instance.setSleepEvents).toHaveBeenCalledWith(true, true)
    expect(instance.setSleepThreshold).toHaveBeenCalledWith(5)
  })
})
