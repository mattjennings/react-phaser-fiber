import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeDragProps } from './applyArcadeDragProps'

describe('applyArcadeDragProps', () => {
  it('applies drag as number', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setDrag = jest.spyOn(instance, 'setDrag')

    applyArcadeDragProps(
      instance,
      {},
      {
        drag: 1,
      }
    )

    expect(setDrag).toHaveBeenCalledWith(1)
  })

  it('applies drag as point', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setDrag = jest.spyOn(instance, 'setDrag')

    applyArcadeDragProps(
      instance,
      {},
      {
        drag: {
          x: 1,
          y: 2,
        },
      }
    )

    expect(setDrag).toHaveBeenCalledWith(1, 2)
  })

  it('applies dragX and dragY', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setDragX = jest.spyOn(instance, 'setDragX')
    const setDragY = jest.spyOn(instance, 'setDragY')

    applyArcadeDragProps(
      instance,
      {},
      {
        dragX: 1,
        dragY: 2,
      }
    )

    expect(setDragX).toHaveBeenCalledWith(1)
    expect(setDragY).toHaveBeenCalledWith(2)
  })
})
