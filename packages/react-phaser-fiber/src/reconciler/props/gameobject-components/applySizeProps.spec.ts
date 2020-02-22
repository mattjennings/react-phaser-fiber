import { createGame } from '../../../test-utils/createGame'
import { applySizeProps } from './applySizeProps'

describe('applySizeProps', () => {
  it('applies height and width props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applySizeProps(
      instance,
      {},
      {
        width: 10,
        height: 10,
      }
    )

    expect(instance.width).toEqual(10)
    expect(instance.height).toEqual(10)
  })

  it('applies displayHeight and displayWidth props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    applySizeProps(
      instance,
      {},
      {
        displayHeight: 100,
        displayWidth: 100,
      }
    )

    expect(instance.displayHeight).toEqual(100)
    expect(instance.displayWidth).toEqual(100)
  })

  it('applies setSizeToFrame', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = scene.add.image(0, 0, null)

    // i'm not sure how to properly create a Frame in a test,
    // but we only care if it's called so we'll just mock it
    const setSizeToFrame = jest.fn()
    instance.setSizeToFrame = setSizeToFrame

    const frame = 'blah' as any

    applySizeProps(
      instance,
      {},
      {
        setSizeToFrame: frame,
      }
    )

    expect(setSizeToFrame).toHaveBeenCalledWith(frame)
  })
})
