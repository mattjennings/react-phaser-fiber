import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import {
  Scene,
  Text,
  useGameLoop,
  useInputEvent,
  useScene,
} from 'react-phaser-fiber'
import Ball from './Ball'
import Block from './Block'
import Paddle from './Paddle'

interface BreakoutState {
  isBallActive?: boolean
  blocks: Array<{ x: number; y: number; frame: string }>
}

const Breakout = () => {
  const scene = useScene()
  const paddleRef = useRef<Phaser.Physics.Arcade.Image>(null)
  const ballRef = useRef<Phaser.Physics.Arcade.Image>(null)

  const [state, dispatch] = useReducer(reducer, defaultState)

  // set collisions on edge of world
  useEffect(() => {
    scene.physics.world.setBoundsCollision(true, true, true, false)
  }, [scene.physics.world])

  useGameLoop(
    useCallback(() => {
      if (paddleRef.current && ballRef.current) {
        // set ball position to paddle when ball is inactive
        if (!state.isBallActive) {
          ballRef.current.setPosition(
            paddleRef.current.x,
            paddleRef.current.y - 48
          )
        }

        // reset ball position if it exits bottom of screen
        if (ballRef.current.y > 800) {
          ballRef.current.setVelocity(0)
          dispatch({ type: 'RESET_BALL' })
        }

        // restart game when all blocks are destroyed
        if (state.blocks.length === 0) {
          ballRef.current.setVelocity(0, 0)
          ballRef.current.setPosition(
            paddleRef.current.x,
            paddleRef.current.y - 48
          )
          dispatch({ type: 'RESET_GAME' })
        }
      }
    }, [state.isBallActive, state.blocks.length])
  )

  useInputEvent(
    'pointerdown',
    useCallback(() => {
      if (ballRef.current && !state.isBallActive) {
        ballRef.current.setVelocity(-75, -600)
        dispatch({ type: 'PLAY' })
      }
    }, [state.isBallActive])
  )

  return (
    <>
      {state.blocks.map((block, index) => {
        return (
          <Block
            key={index}
            ballRef={ballRef}
            x={block.x + 116}
            y={block.y + 200}
            frame={block.frame}
            onBallHit={() => {
              dispatch({ type: 'BLOCK_HIT', payload: index })
            }}
          />
        )
      })}
      <Ball ref={ballRef} paddleRef={paddleRef} bounce={1} collideWorldBounds />
      <Paddle ref={paddleRef} initialX={400} initialY={700} />
    </>
  )
}

const defaultState: BreakoutState = {
  isBallActive: false,
  blocks: Array.from({ length: 60 }).map((_, index) => {
    const blockFrames = [
      'blue1',
      'red1',
      'green1',
      'yellow1',
      'silver1',
      'purple1',
    ]

    return {
      x: (index % 10) * 64,
      y: 10 * Math.floor(index / 10) * 3.2,
      frame: blockFrames[Math.floor(index / 10)],
    }
  }),
}

function reducer(
  state: BreakoutState,
  action: { type: string; payload?: any }
): BreakoutState {
  switch (action.type) {
    case 'RESET_GAME': {
      return defaultState
    }
    case 'RESET_BALL': {
      return {
        ...state,
        isBallActive: false,
      }
    }
    case 'PLAY': {
      return {
        ...state,
        isBallActive: true,
      }
    }
    case 'BLOCK_HIT': {
      return {
        ...state,
        blocks: state.blocks.filter((_, index) => index !== action.payload),
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
      renderLoading={progress => (
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
