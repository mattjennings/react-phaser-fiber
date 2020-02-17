import React from 'react'
import { render, wait } from '@testing-library/react'
import Game from './Game'
import Scene from './Scene'
import Sprite from './Sprite'
import { waitForRef } from '../test-utils/waitForRef'
import nock from 'nock'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS}>
    {props.children}
  </Game>
)

// todo: figure out how to mock textures

describe('Sprite', () => {
  it('renders a sprite', async () => {
    const ref = React.createRef<Phaser.GameObjects.Sprite>()
    render(
      <Scene sceneKey="123">
        <Sprite ref={ref} x={100} y={100} texture={'my-sprite'} />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    expect(ref.current.x).toEqual(100)
    expect(ref.current.y).toEqual(100)
    expect(ref.current.texture).toEqual(
      expect.objectContaining({ key: '__MISSING' })
    )
  })
})
