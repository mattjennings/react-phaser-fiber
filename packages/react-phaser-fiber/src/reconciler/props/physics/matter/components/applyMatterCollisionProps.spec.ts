import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterCollisionProps } from './applyMatterCollisionProps'

describe('applyMatterCollisionProps', () => {
  it('applies collidesWith', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setCollidesWith')

    applyMatterCollisionProps(
      instance,
      {},
      {
        collidesWith: [1],
      }
    )

    expect(instance.setCollidesWith).toHaveBeenCalledWith([1])
  })

  it('applies collisionCategory', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setCollisionCategory')

    applyMatterCollisionProps(
      instance,
      {},
      {
        collisionCategory: 2,
      }
    )

    expect(instance.setCollisionCategory).toHaveBeenCalledWith(2)
  })

  it('applies collisionGroup', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setCollisionGroup')

    applyMatterCollisionProps(
      instance,
      {},
      {
        collisionGroup: 2,
      }
    )

    expect(instance.setCollisionGroup).toHaveBeenCalledWith(2)
  })
})
