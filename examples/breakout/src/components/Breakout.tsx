import React, { useCallback, useReducer, useRef, useEffect } from 'react'
import {
  useGameLoop,
  useInputEvent,
  ArcadeCollider,
  useScene,
} from 'react-phaser-fiber'
import Ball from './Ball'
import Block from './Block'
import Paddle from './Paddle'

export default function Breakout() {
  const scene = useScene()
  const paddleRef = useRef<Phaser.Physics.Arcade.Image>(null)
  const ballRef = useRef<Phaser.Physics.Arcade.Image>(null)

  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    // set collisions on all edges of world except bottom
    scene.physics.world.setBoundsCollision(true, true, true, false)
  }, [scene])

  useGameLoop(
    useCallback(() => {
      // restart game when all blocks are destroyed
      if (state.blocks.length === 0) {
        if (paddleRef.current && ballRef.current) {
          ballRef.current.setVelocity(0, 0)
          ballRef.current.setPosition(
            paddleRef.current.x,
            paddleRef.current.y - 48
          )
          dispatch({ type: 'RESET_GAME' })
        }
      }
    }, [state.blocks.length])
  )

  // launch ball when clicked
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
      <Ball
        ref={ballRef}
        paddleRef={paddleRef}
        snapToPaddle={!state.isBallActive}
        onReset={() => {
          // reset ball position if it exits bottom of screen
          if (ballRef.current && ballRef.current.y > 800) {
            ballRef.current.setVelocity(0)
            dispatch({ type: 'RESET_BALL' })
          }
        }}
      />
      {state.blocks.map((block, index) => {
        return (
          <ArcadeCollider
            key={index}
            with={ballRef}
            onCollide={() => {
              dispatch({ type: 'BLOCK_HIT', payload: index })
            }}
          >
            {ref => (
              <Block
                ref={ref}
                x={block.x + 116}
                y={block.y + 200}
                frame={block.frame}
              />
            )}
          </ArcadeCollider>
        )
      })}
      <Paddle ref={paddleRef} initialX={400} initialY={700} />
    </>
  )
}

interface BreakoutState {
  isBallActive: boolean
  blocks: Array<{ x: number; y: number; frame: string }>
}

const defaultState: BreakoutState = {
  isBallActive: false,
  blocks: Array.from({ length: 60 }).map((_, index) => {
    // possible sprites to use for block
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
      // each row uses same sprite
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
