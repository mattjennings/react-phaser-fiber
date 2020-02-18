import { render, wait } from '@testing-library/react'
import React from 'react'
import { asMock } from '../test-utils/asMock'
import Game from './Game'
import { useGroup } from './Group'
import Image from './Image'
import Scene from './Scene'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS}>
    {props.children}
  </Game>
)

jest.mock('./Group', () => ({
  useGroup: jest.fn(),
}))

describe('GameObject', () => {
  it('adds the game object to the group', async () => {
    const group = {
      add: jest.fn(),
      remove: jest.fn(),
    }
    asMock(useGroup).mockImplementationOnce(() => group)

    render(
      <Scene sceneKey="123">
        <Image x={100} y={100} texture={'my-sprite'} />
      </Scene>,
      { wrapper }
    )

    await wait()

    expect(group.add).toHaveBeenCalled()
  })

  it('removes the game object to the group', async () => {
    const group = {
      add: jest.fn(),
      remove: jest.fn(),
    }
    asMock(useGroup).mockImplementationOnce(() => group)

    const { unmount } = render(
      <Scene sceneKey="123">
        <Image x={100} y={100} texture={'my-sprite'} />
      </Scene>,
      { wrapper }
    )

    await wait()
    unmount()

    expect(group.remove).toHaveBeenCalled()
  })
})
