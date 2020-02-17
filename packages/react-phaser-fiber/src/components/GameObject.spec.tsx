import React from 'react'
import { render } from '@testing-library/react'
import Game from './Game'
import Scene from './Scene'
import { waitForRef } from '../test-utils/waitForRef'
import Image from './Image'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS}>
    {props.children}
  </Game>
)

describe('GameObject', () => {
  // we'll use the Image component as the basis for testing GameObject
  // since Phaser doesn't allow a pure GameObject instance to be added to a scene
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
})
