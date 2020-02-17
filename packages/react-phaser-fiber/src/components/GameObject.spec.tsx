import React from 'react'
import { render } from '@testing-library/react'
import Game from './Game'
import Scene from './Scene'
import { waitForRef } from '../test-utils/waitForRef'
import Image from './Image'
import Sprite from './Sprite'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS}>
    {props.children}
  </Game>
)

// Phaser doesn't allow a pure GameObject instance to be added to a scene so
// we'll be using the various Image, Sprite, etc. components to test out specific props
describe('GameObject', () => {
  it('applies transform props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Image>()

    render(
      <Scene sceneKey="123">
        <Image
          ref={ref}
          x={100}
          y={100}
          angle={100}
          scale={{
            x: 2,
            y: 4,
          }}
          z={2}
          w={2}
        />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    expect(ref.current.x).toEqual(100)
    expect(ref.current.y).toEqual(100)
    expect(ref.current.angle).toEqual(100)
    expect(ref.current.scale).toEqual(3)
    expect(ref.current.z).toEqual(2)
    expect(ref.current.w).toEqual(2)
  })

  it('applies visible props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Image>()

    render(
      <Scene sceneKey="123">
        <Image ref={ref} visible={false} />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    expect(ref.current.visible).toEqual(false)
  })

  it('applies animation props', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()

    render(
      <Scene sceneKey="123">
        <Sprite
          ref={ref}
          accumulator={2}
          delay={2}
          duration={10}
          forward={false}
          isPlaying={false}
          msPerFrame={100}
          skipMissedFrames={false}
          repeat={5}
          repeatDelay={10}
          timeScale={10}
          yoyo
        />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    expect(ref.current.anims.accumulator).toEqual(2)
    expect(ref.current.anims.getDelay()).toEqual(2)
    expect(ref.current.anims.duration).toEqual(10)
    expect(ref.current.anims.forward).toEqual(false)
    expect(ref.current.anims.isPlaying).toEqual(false)
    expect(ref.current.anims.msPerFrame).toEqual(100)
    expect(ref.current.anims.skipMissedFrames).toEqual(false)
    expect(ref.current.anims.getRepeat()).toEqual(5)
    expect(ref.current.anims.getRepeatDelay()).toEqual(10)
    expect(ref.current.anims.getTimeScale()).toEqual(10)
    expect(ref.current.anims.getYoyo()).toEqual(true)
  })
})
