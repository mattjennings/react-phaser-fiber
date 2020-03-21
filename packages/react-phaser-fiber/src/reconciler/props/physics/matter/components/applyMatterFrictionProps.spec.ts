import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterFrictionProps } from './applyMatterFrictionProps'

describe('applyMatterFrictionProps', () => {
  it('applies friction', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setFriction')

    applyMatterFrictionProps(
      instance,
      {},
      {
        friction: 1,
      }
    )

    expect(instance.setFriction).toHaveBeenCalledWith(1)
  })

  it('applies frictionAir', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setFrictionAir')

    applyMatterFrictionProps(
      instance,
      {},
      {
        frictionAir: 1,
      }
    )

    expect(instance.setFrictionAir).toHaveBeenCalledWith(1)
  })

  it('applies frictionStatic', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setFrictionStatic')

    applyMatterFrictionProps(
      instance,
      {},
      {
        frictionStatic: 1,
      }
    )

    expect(instance.setFrictionStatic).toHaveBeenCalledWith(1)
  })
})
