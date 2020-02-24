import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeEnableProps } from './applyArcadeEnableProps'

describe('applyArcadeEnableProps', () => {
  it('applies disableBody', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const disableBody = jest.spyOn(instance, 'disableBody')

    applyArcadeEnableProps(
      instance,
      {},
      {
        disableBody: true,
      }
    )

    expect(disableBody).toHaveBeenCalledWith()
  })

  it('enables the body', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const enableBody = jest.spyOn(instance, 'enableBody')

    applyArcadeEnableProps(
      instance,
      {
        disableBody: true,
      },
      {
        disableBody: false,
      }
    )

    expect(enableBody).toHaveBeenCalledWith(false, 0, 0, true, true)
  })

  it('applies disableBody with disableGameObject', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const disableBody = jest.spyOn(instance, 'disableBody')

    applyArcadeEnableProps(
      instance,
      {},
      {
        disableBody: {
          disableGameObject: true,
        },
      }
    )

    expect(disableBody).toHaveBeenCalledWith(true, false)
  })

  it('applies disableBody with hideGameObject', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const disableBody = jest.spyOn(instance, 'disableBody')

    applyArcadeEnableProps(
      instance,
      {},
      {
        disableBody: {
          hideGameObject: true,
        },
      }
    )

    expect(disableBody).toHaveBeenCalledWith(false, true)
  })
})
