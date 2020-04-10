import React from 'react'
import { render, wait } from '@testing-library/react'
import Game from './Game'
import Scene from './Scene'
import Image from './Image'
import { waitForRef } from '../test-utils/waitForRef'
import ArcadePhysics from './ArcadePhysics'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS} physics={{ default: 'arcade' }}>
    {props.children}
  </Game>
)

describe('ArcadePhysics', () => {
  it('enables physics for the parent GameObject', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    expect(ref.current.body).toBeInstanceOf(Phaser.Physics.Arcade.Body)
  })

  it('enables applies acceleration props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics acceleration={5} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.acceleration.x).toEqual(5)
    expect(body.acceleration.y).toEqual(5)
  })

  it('enables applies angular props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics angularAcceleration={5} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.angularAcceleration).toEqual(5)
  })

  it('enables applies bounce props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics bounce={5} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.bounce.x).toEqual(5)
    expect(body.bounce.y).toEqual(5)
  })

  it('enables applies debug props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics
            debug={{
              showBody: false,
            }}
          />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.debugShowBody).toEqual(false)
  })

  it('enables applies drag props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics drag={5} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.drag).toEqual({ x: 5, y: 5 })
  })

  it('enables applies friction props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics friction={5} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.friction).toEqual({ x: 5, y: 5 })
  })

  it('enables applies gravity props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics allowGravity={false} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.allowGravity).toEqual(false)
  })

  it('enables applies immovable props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics immovable />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.immovable).toEqual(true)
  })

  it('enables applies mass props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics mass={5} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.mass).toEqual(5)
  })

  it('enables applies size props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics
            size={{
              height: 10,
              width: 10,
            }}
          />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.width).toEqual(10)
    expect(body.height).toEqual(10)
  })

  it('enables applies velocity props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics velocity={5} />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.velocity).toEqual({ x: 5, y: 5 })
  })

  it('enables applies body props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Image ref={ref} x={100} y={100} texture={'my-sprite'}>
          <ArcadePhysics allowRotation />
        </Image>
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)
    const body = ref.current.body as Phaser.Physics.Arcade.Body

    expect(body.allowRotation).toEqual(true)
  })
})
