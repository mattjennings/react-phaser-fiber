import React, { useState, useReducer, useRef, useCallback } from 'react'
import 'react-app-polyfill/ie11'
import ReactDOM from 'react-dom'
import { Game, Scene, Text, useGameLoop, useInputEvent } from 'react-phaser'
import Paddle from './components/Paddle'
import { SceneProps } from 'react-phaser/dist/components/Scene'
import Block from './components/Block'
import Ball from './components/Ball'

const App = () => {
  return (
    <Game width={800} height={800}>
      <Scene
        sceneKey="breakout"
        onPreload={scene => {
          scene.load.atlas(
            'assets',
            'assets/breakout.png',
            'assets/breakout.json'
          )
        }}
        loadingFallback={progress => (
          <Text
            x={400}
            y={400}
            text={`Loading... (${progress * 100}%)`}
            style={{ color: 'white' }}
          />
        )}
      >
        <Breakout />
      </Scene>
    </Game>
  )
}

const blockFrames = ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1']

enum BreakoutFiniteState {
  START = 'START',
  PLAY = 'PLAY',
}

interface BreakoutState {
  state: BreakoutFiniteState
  blocks: Array<{ x: number; y: number; frame: string }>
}

const Breakout = () => {
  const paddleRef = useRef<Phaser.GameObjects.Image>(null)
  const [ballPos, setBallPos] = useState({ x: 116, y: 136 })

  const [state, dispatch] = useReducer(reducer, {
    state: BreakoutFiniteState.START,
    blocks: Array.from({ length: 60 }).map((_, index) => ({
      x: (index % 10) * 64,
      y: 10 * Math.floor(index / 10) * 3.2,
      frame: blockFrames[Math.floor(index / 10)],
    })),
  })

  // set ball position to paddle when game is in START state
  useGameLoop(
    useCallback(() => {
      if (paddleRef.current && state.state === BreakoutFiniteState.START) {
        setBallPos({ x: paddleRef.current.x, y: paddleRef.current.y - 64 })
      }
    }, [state.state])
  )

  useInputEvent(
    'pointerdown',
    useCallback(() => {
      dispatch({ type: BreakoutFiniteState.PLAY })
    }, [])
  )

  return (
    <>
      {state.blocks.map((block, index) => {
        return (
          <Block
            key={index}
            x={block.x + 116}
            y={block.y + 200}
            frame={block.frame}
          />
        )
      })}
      <Ball x={ballPos.x} y={ballPos.y} />
      <Paddle ref={paddleRef} initialX={400} initialY={700} />
    </>
  )
}

function reducer(
  state: BreakoutState,
  action: { type: string; payload?: any }
): BreakoutState {
  switch (action.type) {
    case BreakoutFiniteState.PLAY: {
      return {
        ...state,
        state: BreakoutFiniteState.PLAY,
      }
    }
  }
  return state
}

ReactDOM.render(<App />, document.getElementById('root'))
