import { createGame } from '../../../../test-utils/createGame'
import { applyPipelineProps } from './applyPipelineProps'

describe('applyPipelineProps', () => {
  it('applies pipeline', async () => {
    const { game, scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    const setPipeline = jest.spyOn(instance, 'setPipeline')

    applyPipelineProps(
      instance,
      {},
      {
        pipeline: 'blah',
      }
    )

    expect(setPipeline).toHaveBeenCalledWith('blah')
  })
})
