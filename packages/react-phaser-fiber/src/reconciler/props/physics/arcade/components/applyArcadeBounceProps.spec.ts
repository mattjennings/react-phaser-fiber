import { createGame } from '../../../../../test-utils/createGame'
import { applyArcadeBounceProps } from './applyArcadeBounceProps'

describe('applyArcadeBounceProps', () => {
  it('applies bounce', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setBounce = jest.spyOn(instance, 'setBounce')

    applyArcadeBounceProps(
      instance,
      {},
      {
        bounce: 1,
      }
    )

    expect(setBounce).toHaveBeenCalledWith(1)
  })

  it('applies bounceX', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setBounceX = jest.spyOn(instance, 'setBounceX')

    applyArcadeBounceProps(
      instance,
      {},
      {
        bounceX: 1,
      }
    )

    expect(setBounceX).toHaveBeenCalledWith(1)
  })

  it('applies bounceY', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setBounceY = jest.spyOn(instance, 'setBounceY')

    applyArcadeBounceProps(
      instance,
      {},
      {
        bounceY: 1,
      }
    )

    expect(setBounceY).toHaveBeenCalledWith(1)
  })

  it('applies collideWorldBounds', async () => {
    const { game, scene } = await createGame()

    const instance = scene.physics.add.sprite(0, 0, null)
    const setCollideWorldBounds = jest.spyOn(instance, 'setCollideWorldBounds')

    applyArcadeBounceProps(
      instance,
      {},
      {
        collideWorldBounds: true,
      }
    )

    expect(setCollideWorldBounds).toHaveBeenCalledWith(true)
  })
})
