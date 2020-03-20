import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterForceProps } from './applyMatterForceProps'

describe('applyMatterForceProps', () => {
  it('applies force', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'applyForce')

    applyMatterForceProps(
      instance,
      {},
      {
        force: { x: 0, y: 1 },
      }
    )

    expect(instance.applyForce).toHaveBeenCalledWith({ x: 0, y: 1 })
  })

  it('applies forceFrom', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'applyForceFrom')

    applyMatterForceProps(
      instance,
      {},
      {
        forceFrom: {
          position: { x: 0, y: 1 },
          force: { x: 1, y: 1 },
        },
      }
    )

    expect(instance.applyForceFrom).toHaveBeenCalledWith(
      new Phaser.Math.Vector2({ x: 0, y: 1 }),
      new Phaser.Math.Vector2({ x: 1, y: 1 })
    )
  })

  it('applies thrust', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'thrust')

    applyMatterForceProps(
      instance,
      {},
      {
        thrust: 1,
      }
    )

    expect(instance.thrust).toHaveBeenCalledWith(1)
  })

  it('applies thrustBack', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'thrustBack')

    applyMatterForceProps(
      instance,
      {},
      {
        thrustBack: 1,
      }
    )

    expect(instance.thrustBack).toHaveBeenCalledWith(1)
  })

  it('applies thrustLeft', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'thrustLeft')

    applyMatterForceProps(
      instance,
      {},
      {
        thrustLeft: 1,
      }
    )

    expect(instance.thrustLeft).toHaveBeenCalledWith(1)
  })

  it('applies thrustRight', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'thrustRight')

    applyMatterForceProps(
      instance,
      {},
      {
        thrustRight: 1,
      }
    )

    expect(instance.thrustRight).toHaveBeenCalledWith(1)
  })
})
