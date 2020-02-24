import { createGame } from '../../../test-utils/createGame'
import { applyGameObjectProps } from './applyGameObjectProps'

describe('applyGameObjectProps', () => {
  it('applies active', async () => {
    const { scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyGameObjectProps(
      instance,
      {},
      {
        active: false,
      }
    )

    expect(instance.active).toEqual(false)
  })

  it('applies tabIndex', async () => {
    const { scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyGameObjectProps(
      instance,
      {},
      {
        tabIndex: 2,
      }
    )

    expect(instance.tabIndex).toEqual(2)
  })

  it('applies renderFlags', async () => {
    const { scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyGameObjectProps(
      instance,
      {},
      {
        renderFlags: 2,
      }
    )

    expect(instance.renderFlags).toEqual(2)
  })

  it('applies cameraFilter', async () => {
    const { scene } = await createGame()

    const instance = scene.add.image(0, 0, null)

    applyGameObjectProps(
      instance,
      {},
      {
        cameraFilter: 2,
      }
    )

    expect(instance.cameraFilter).toEqual(2)
  })
})

it('applies ignoreDestroy', async () => {
  const { scene } = await createGame()

  const instance = scene.add.image(0, 0, null)

  applyGameObjectProps(
    instance,
    {},
    {
      ignoreDestroy: true,
    }
  )

  expect(instance.ignoreDestroy).toEqual(true)
})

it('applies interactive', async () => {
  const { scene } = await createGame()

  const instance = scene.add.image(0, 0, null)

  const spy = jest.spyOn(instance, 'setInteractive')
  const callback = jest.fn()
  const shape = jest.fn()
  const dropZone = true

  applyGameObjectProps(
    instance,
    {},
    {
      interactive: {
        shape,
        dropZone,
        callback,
      },
    }
  )

  expect(spy).toHaveBeenCalledWith(shape, callback, dropZone)
})

it('applies name', async () => {
  const { scene } = await createGame()

  const instance = scene.add.image(0, 0, null)

  applyGameObjectProps(
    instance,
    {},
    {
      name: '123',
    }
  )

  expect(instance.name).toEqual('123')
})

it('applies data', async () => {
  const { scene } = await createGame()

  const instance = scene.add.image(0, 0, null)

  applyGameObjectProps(
    instance,
    {},
    {
      data: {
        something: '123',
      },
    }
  )

  expect(instance.data.getAll()).toEqual({
    something: '123',
  })
})
