import React from 'react'
import { render, wait } from '@testing-library/react'
import Game from './Game'
import Scene from './Scene'
import Group from './Group'
import { waitForRef } from '../test-utils/waitForRef'
import nock from 'nock'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS}>
    {props.children}
  </Game>
)

// todo: figure out how to mock textures

describe('Group', () => {
  it('creates a group', async () => {
    const ref = React.createRef<Phaser.GameObjects.Group>()
    render(
      <Scene sceneKey="123">
        <Group
          ref={ref}
          active={false}
          defaultFrame={0}
          defaultKey={'0'}
          isParent
          name="my-group"
        />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    expect(ref.current.active).toEqual(false)
    expect(ref.current.defaultFrame).toEqual(0)
    expect(ref.current.defaultKey).toEqual('0')
    expect(ref.current.isParent).toEqual(true)
    expect(ref.current.name).toEqual('my-group')
  })

  it('removes the group', async () => {
    const ref = React.createRef<Phaser.GameObjects.Group>()
    const { unmount } = render(
      <Scene sceneKey="123">
        <Group
          ref={ref}
          active={false}
          defaultFrame={0}
          defaultKey={'0'}
          isParent
          name="my-group"
        />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    const destroy = jest.spyOn(ref.current, 'destroy')

    unmount()

    expect(destroy).toHaveBeenCalled()
  })
})
