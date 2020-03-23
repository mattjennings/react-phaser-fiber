import { render, wait } from '@testing-library/react'
import React from 'react'
import Game, { GameProps, GameRefType } from '../Game'
import Scene from './Scene'
import nock from 'nock'

describe('Scene', () => {
  it('adds a scene to the game', async () => {
    const gameRef = React.createRef<GameRefType>()
    const sceneRef = React.createRef<Phaser.Scene>()

    render(
      <Game ref={gameRef} banner={false} type={Phaser.HEADLESS}>
        <Scene sceneKey="123" ref={sceneRef} />
      </Game>
    )

    await wait()

    expect(gameRef.current.game.scene.getScene('123')).toEqual(sceneRef.current)
  })

  it('removes the scene from the game', async () => {
    const gameRef = React.createRef<GameRefType>()
    const sceneRef = React.createRef<Phaser.Scene>()

    const { rerender } = render(
      <Game ref={gameRef} banner={false} type={Phaser.HEADLESS}>
        <Scene sceneKey="123" ref={sceneRef} />
      </Game>
    )

    await wait()

    rerender(<Game ref={gameRef} banner={false} type={Phaser.HEADLESS} />)

    expect(gameRef.current.game.scene.getScene('123')).toBeNull()
  })

  it('calls lifecycle methods', async () => {
    const sceneRef = React.createRef<Phaser.Scene>()

    const onInit = jest.fn()
    const onCreate = jest.fn()
    const onPreload = jest.fn()

    render(
      <Game banner={false} type={Phaser.HEADLESS}>
        <Scene
          sceneKey="123"
          ref={sceneRef}
          onInit={onInit}
          onCreate={onCreate}
          onPreload={onPreload}
        />
      </Game>
    )

    await wait()

    // we can call these ourselves rather than wait for the game to call them
    // and this will be good enough to validate the test

    //@ts-ignore
    sceneRef.current.preload()
    //@ts-ignore
    sceneRef.current.create()
    //@ts-ignore
    sceneRef.current.init()

    expect(onInit).toHaveBeenCalled()
    expect(onCreate).toHaveBeenCalled()
    expect(onPreload).toHaveBeenCalled()
  })

  it('renders loading fallback', async () => {
    nock('http://fake-url.com')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/json')
      .reply(200, { blah: '123' })
      .get('/json2')
      .reply(200, { blah: '123' })
      .get('/json3')
      .reply(200, { blah: '123' })

    const sceneRef = React.createRef<Phaser.Scene>()
    const renderLoading = jest.fn()

    render(
      <Game banner={false} type={Phaser.HEADLESS}>
        <Scene
          sceneKey="main"
          ref={sceneRef}
          renderLoading={renderLoading}
          onPreload={scene => {
            scene.load.json({
              key: 'json',
              url: 'http://fake-url.com/json',
            })
            scene.load.json({
              key: 'json2',
              url: 'http://fake-url.com/json2',
            })
            scene.load.json({
              key: 'json3',
              url: 'http://fake-url.com/json3',
            })
          }}
        />
      </Game>
    )

    await wait()
    await wait()

    expect(renderLoading).toHaveBeenCalledWith(0)
    expect(renderLoading).toHaveBeenCalledWith(0.33333333333333337)
    expect(renderLoading).toHaveBeenCalledWith(0.6666666666666667)
    expect(renderLoading).toHaveBeenCalledWith(1)
  })
})
