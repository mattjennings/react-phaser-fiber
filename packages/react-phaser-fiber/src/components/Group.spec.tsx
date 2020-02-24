import React from 'react'
import { render, wait } from '@testing-library/react'
import Game from './Game'
import Scene from './Scene'
import Group from './Group'
import Image from './Image'
import { waitForRef } from '../test-utils/waitForRef'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS}>
    {props.children}
  </Game>
)

describe('Group', () => {
  it('creates a group', async () => {
    const ref = React.createRef<Phaser.GameObjects.Group>()
    render(
      <Scene sceneKey="123">
        <Group ref={ref} active={false} name="my-group" />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    expect(ref.current.active).toEqual(false)
    expect(ref.current.name).toEqual('my-group')
  })

  it('removes the group', async () => {
    const ref = React.createRef<Phaser.GameObjects.Group>()
    const { unmount } = render(
      <Scene sceneKey="123">
        <Group ref={ref} active={false} name="my-group" />
      </Scene>,
      { wrapper }
    )
    await waitForRef(ref)

    const destroy = jest.spyOn(ref.current, 'destroy')

    unmount()

    expect(destroy).toHaveBeenCalled()
  })

  it('adds the game object to the group', async () => {
    const groupRef = React.createRef<Phaser.GameObjects.Group>()
    render(
      <Scene sceneKey="123">
        <Group ref={groupRef}>
          <Image x={100} y={100} texture="something" />
        </Group>
      </Scene>,
      { wrapper }
    )

    await wait()

    expect(groupRef.current.children.entries).toHaveLength(1)
  })

  it('removes the game object from the group', async () => {
    const groupRef = React.createRef<Phaser.GameObjects.Group>()

    const { rerender } = render(
      <Scene sceneKey="123">
        <Group ref={groupRef}>
          <Image x={100} y={100} texture="something" />
        </Group>
      </Scene>,
      { wrapper }
    )

    await wait()
    rerender(
      <Scene sceneKey="123">
        <Group ref={groupRef}></Group>
      </Scene>
    )

    expect(groupRef.current.children.entries).toHaveLength(0)
  })
})
