import React, { useCallback, useReducer, useRef, useState } from 'react'
import { Game, Scene, Text } from 'react-phaser'
import 'react-app-polyfill/ie11'
import { useGameLoop, useInputEvent } from 'react-phaser'
import Ball from './Ball'
import Block from './Block'
import Paddle from './Paddle'

const blockFrames = ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1']

// is there better name for this?
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

export default function BreakoutScene() {
  return (
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
  )
}
