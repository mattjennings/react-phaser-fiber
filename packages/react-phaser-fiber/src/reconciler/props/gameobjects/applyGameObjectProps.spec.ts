import { createGame } from '../../../test-utils/createGame'
import { applyGameObjectProps } from './applyGameObjectProps'

describe('applyGameObjectProps', () => {
  it('applies angular props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setAngularAcceleration = jest.spyOn(
      instance,
      'setAngularAcceleration'
    )
    const setAngularDrag = jest.spyOn(instance, 'setAngularDrag')
    const setAngularVelocity = jest.spyOn(instance, 'setAngularVelocity')

    applyGameObjectProps(
      instance,
      {},
      {
        angularAcceleration: 1,
        angularDrag: 1,
        angularVelocity: 1,
      }
    )

    expect(setAngularAcceleration).toHaveBeenCalledWith(1)
    expect(setAngularDrag).toHaveBeenCalledWith(1)
    expect(setAngularVelocity).toHaveBeenCalledWith(1)
  })

  it('applies bounce props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setBounce = jest.spyOn(instance, 'setBounce')
    const setCollideWorldBounds = jest.spyOn(instance, 'setCollideWorldBounds')

    applyGameObjectProps(
      instance,
      {},
      {
        bounce: 1,
        collideWorldBounds: true,
        onWorldBounds: true,
      }
    )

    expect(setBounce).toHaveBeenCalledWith(1, 1)
    expect(setCollideWorldBounds).toHaveBeenCalledWith(true)
    expect(instance.body.onWorldBounds).toEqual(true)
  })

  it('applies debug props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)

    applyGameObjectProps(
      instance,
      {},
      {
        debugBodyColor: 0x00,
        debugShowBody: true,
        debugShowVelocity: true,
      }
    )

    expect(instance.debugBodyColor).toEqual(0x00)
    expect(instance.debugShowBody).toEqual(true)
    expect(instance.debugShowVelocity).toEqual(true)
  })

  it('applies drag props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setDamping = jest.spyOn(instance, 'setDamping')
    const setDrag = jest.spyOn(instance, 'setDrag')
    // @ts-ignore - not in type defs, but is there
    const setAllowDrag = jest.spyOn(instance.body, 'setAllowDrag')

    applyGameObjectProps(
      instance,
      {},
      {
        damping: 1,
        drag: 1,
        allowDrag: true,
      }
    )

    expect(setDamping).toHaveBeenCalledWith(1)
    expect(setDrag).toHaveBeenCalledWith(1, 1)
    expect(setAllowDrag).toHaveBeenCalledWith(true)
  })

  it('applies enable props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const disableBody = jest.spyOn(instance, 'disableBody')

    applyGameObjectProps(
      instance,
      {},
      {
        disableBody: true,
        hideBody: true,
      }
    )

    expect(disableBody).toHaveBeenCalledWith(true, true)
  })

  it('applies friction props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setFriction = jest.spyOn(instance, 'setFriction')

    applyGameObjectProps(
      instance,
      {},
      {
        friction: 1,
      }
    )

    expect(setFriction).toHaveBeenCalledWith(1, 1)
  })

  it('applies gravity props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setGravity = jest.spyOn(instance, 'setGravity')
    // @ts-ignore - not in type defs
    const setAllowGravity = jest.spyOn(instance.body, 'setAllowGravity')

    applyGameObjectProps(
      instance,
      {},
      {
        gravity: 1,
        allowGravity: true,
      }
    )

    expect(setGravity).toHaveBeenCalledWith(1, 1)
    expect(setAllowGravity).toHaveBeenCalledWith(true)
  })

  it('applies immovable props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setImmovable = jest.spyOn(instance, 'setImmovable')

    applyGameObjectProps(
      instance,
      {},
      {
        immovable: true,
      }
    )

    expect(setImmovable).toHaveBeenCalledWith(true)
  })

  it('applies mass props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setMass = jest.spyOn(instance, 'setMass')

    applyGameObjectProps(
      instance,
      {},
      {
        mass: 1,
      }
    )

    expect(setMass).toHaveBeenCalledWith(1)
  })

  it('applies size props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setCircle = jest.spyOn(instance, 'setCircle')
    const setOffset = jest.spyOn(instance, 'setOffset')
    const setSize = jest.spyOn(instance, 'setSize')

    applyGameObjectProps(
      instance,
      {},
      {
        circle: {
          radius: 1,
          offsetX: 2,
          offsetY: 3,
        },
        offset: {
          x: 1,
          y: 2,
        },
        size: {
          width: 1,
          height: 2,
          center: 3,
        },
      }
    )

    expect(setCircle).toHaveBeenCalledWith(1, 2, 3)
    expect(setOffset).toHaveBeenCalledWith(1, 2)
    expect(setSize).toHaveBeenCalledWith(1, 2, 3)
  })

  it('applies velocity props', async () => {
    const game = await createGame()

    const scene = game.scene.add('123', {}, true)
    const instance = scene.physics.add.sprite(0, 0, null)
    const setVelocity = jest.spyOn(instance, 'setVelocity')
    const setMaxVelocity = jest.spyOn(instance, 'setMaxVelocity')

    applyGameObjectProps(
      instance,
      {},
      {
        velocity: 1,
        maxVelocity: 2,
      }
    )

    expect(setVelocity).toHaveBeenCalledWith(1, 1)
    expect(setMaxVelocity).toHaveBeenCalledWith(2, 2)
  })
})
