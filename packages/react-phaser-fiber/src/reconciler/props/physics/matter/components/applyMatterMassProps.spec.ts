import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterMassProps } from './applyMatterMassProps'

describe('applyMatterMassProps', () => {
  it('applies mass', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setMass')

    applyMatterMassProps(
      instance,
      {},
      {
        mass: 5,
      }
    )

    expect(instance.setMass).toHaveBeenCalledWith(5)
  })

  it('applies density', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setDensity')

    applyMatterMassProps(
      instance,
      {},
      {
        density: 5,
      }
    )

    expect(instance.setDensity).toHaveBeenCalledWith(5)
  })
})
