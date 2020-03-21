import { createGame } from '../../../../../test-utils/createGame'
import { applyMatterSetBodyProps } from './applyMatterSetBodyProps'

describe('applyMatterSetBodyProps', () => {
  it('applies circle', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setCircle')

    applyMatterSetBodyProps(
      instance,
      {},
      {
        circle: {
          radius: 5,
          options: {
            ignoreGravity: true,
          },
        },
      }
    )

    expect(instance.setCircle).toHaveBeenCalledWith(5, { ignoreGravity: true })
  })

  it('applies rectangle', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setRectangle')

    applyMatterSetBodyProps(
      instance,
      {},
      {
        rectangle: {
          width: 5,
          height: 10,
          options: {
            ignoreGravity: true,
          },
        },
      }
    )

    expect(instance.setRectangle).toHaveBeenCalledWith(5, 10, {
      ignoreGravity: true,
    })
  })

  it('applies polygon', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setPolygon')

    applyMatterSetBodyProps(
      instance,
      {},
      {
        polygon: {
          radius: 5,
          sides: 10,
          options: {
            ignoreGravity: true,
          },
        },
      }
    )

    expect(instance.setPolygon).toHaveBeenCalledWith(5, 10, {
      ignoreGravity: true,
    })
  })

  it('applies trapezoid', async () => {
    const { scene } = await createGame({ physics: { default: 'matter' } })
    const instance = scene.matter.add.sprite(0, 0, null)

    jest.spyOn(instance, 'setTrapezoid')

    applyMatterSetBodyProps(
      instance,
      {},
      {
        trapezoid: {
          width: 5,
          height: 10,
          slope: 20,
          options: {
            ignoreGravity: true,
          },
        },
      }
    )

    expect(instance.setTrapezoid).toHaveBeenCalledWith(5, 10, 20, {
      ignoreGravity: true,
    })
  })
})
