import { createGame } from '../../../../test-utils/createGame'
import { applyTransformProps } from './applyTransformProps'

describe('applyTransformProps', () => {
  it('applies transform props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applyTransformProps(
      instance,
      {},
      {
        x: 100,
        y: 100,
        angle: 100,
        scale: {
          x: 2,
          y: 4,
        },
        z: 2,
        w: 2,
      }
    )

    expect(instance.x).toEqual(100)
    expect(instance.y).toEqual(100)
    expect(instance.angle).toEqual(100)
    expect(instance.scale).toEqual(3)
    expect(instance.z).toEqual(2)
    expect(instance.w).toEqual(2)
  })
})
