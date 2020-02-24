import { createGame } from '../../../../test-utils/createGame'
import { applyMaskProps } from './applyMaskProps'

describe('applyMaskProps', () => {
  it('applies mask', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)
    const mask = new Phaser.Display.Masks.BitmapMask(scene, instance)
    applyMaskProps(
      instance,
      {},
      {
        mask,
      }
    )

    expect(instance.mask).toEqual(mask)
  })

  it('resets mask', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)
    const mask = new Phaser.Display.Masks.BitmapMask(scene, instance)

    applyMaskProps(
      instance,
      {},
      {
        mask,
      }
    )

    applyMaskProps(
      instance,
      {
        mask,
      },
      {
        mask: null,
      }
    )

    expect(instance.mask).toEqual(null)
  })
})
