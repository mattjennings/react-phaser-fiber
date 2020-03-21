import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterSensorProps } from './applyMatterSensorProps'

describe('applyMatterSensorProps', () => {
  it('applies sensor', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setSensor')

    applyMatterSensorProps(
      instance,
      {},
      {
        sensor: true,
      }
    )

    expect(instance.setSensor).toHaveBeenCalledWith(true)
  })
})
