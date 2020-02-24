import { createGame } from '../../../../test-utils/createGame'
import { applyTextureProps } from './applyTextureProps'

describe('applyTextureProps', () => {
  it('applies texture', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    const setTexture = jest.spyOn(instance, 'setTexture')

    applyTextureProps(
      instance,
      {},
      {
        texture: 'blah',
      }
    )

    expect(setTexture).toHaveBeenCalledWith('blah')
  })

  it('applies frame', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    const setFrame = jest.spyOn(instance, 'setFrame')

    applyTextureProps(
      instance,
      {},
      {
        frame: 'blah',
      }
    )

    expect(setFrame).toHaveBeenCalledWith('blah', true, true)
  })
})
