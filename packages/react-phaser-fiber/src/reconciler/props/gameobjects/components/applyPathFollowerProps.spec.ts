import { createGame } from '../../../../test-utils/createGame'
import { applyPathFollowerProps } from './applyPathFollowerProps'

describe('applyPathFollowerProps', () => {
  it('applies folllow for path', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = new Phaser.GameObjects.PathFollower(
      scene,
      null,
      0,
      0,
      null
    )
    scene.add.existing(instance)

    const startFollow = jest.spyOn(instance, 'startFollow')
    applyPathFollowerProps(
      instance,
      {},
      {
        path: new Phaser.Curves.Path(0, 0),
        follow: {
          to: 1,
          from: 0,
        },
      }
    )

    expect(startFollow).toHaveBeenCalledWith({ to: 1, from: 0 })
  })

  it('stops the follow', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = new Phaser.GameObjects.PathFollower(
      scene,
      null,
      0,
      0,
      null
    )
    scene.add.existing(instance)

    const stopFollow = jest.spyOn(instance, 'stopFollow')

    applyPathFollowerProps(
      instance,
      {
        path: new Phaser.Curves.Path(0, 0),
        follow: {
          to: 1,
          from: 0,
        },
      },
      {
        follow: null,
      }
    )

    expect(stopFollow).toHaveBeenCalled()
  })

  it('applies pauseFollow', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {})
    const instance = new Phaser.GameObjects.PathFollower(
      scene,
      null,
      0,
      0,
      null
    )
    scene.add.existing(instance)

    const pauseFollow = jest.spyOn(instance, 'pauseFollow')
    const resumeFollow = jest.spyOn(instance, 'resumeFollow')
    applyPathFollowerProps(
      instance,
      {},
      {
        pauseFollow: true,
      }
    )

    applyPathFollowerProps(
      instance,
      {},
      {
        pauseFollow: false,
      }
    )

    expect(pauseFollow).toHaveBeenCalled()
    expect(resumeFollow).toHaveBeenCalled()
  })
})
