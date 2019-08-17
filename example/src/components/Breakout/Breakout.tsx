import React, {
  useCallback,
  useReducer,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import { Scene, Text, ArcadeCollider, useScene } from 'react-phaser'
import 'react-app-polyfill/ie11'
import { useGameLoop, useInputEvent } from 'react-phaser'
import Ball from './Ball'
import Block from './Block'
import Paddle from './Paddle'
import { useEffect } from 'react'

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
  const scene = useScene()
  const paddleRef = useRef<Phaser.Physics.Arcade.Image>(null)
  const ballRef = useRef<Phaser.Physics.Arcade.Image>(null)
  const [ballPos, setBallPos] = useState({ x: 116, y: 136 })

  const [state, dispatch] = useReducer(reducer, {
    state: BreakoutFiniteState.START,
    blocks: Array.from({ length: 60 }).map((_, index) => ({
      x: (index % 10) * 64,
      y: 10 * Math.floor(index / 10) * 3.2,
      frame: blockFrames[Math.floor(index / 10)],
    })),
  })

  useEffect(() => {
    scene.physics.world.setBoundsCollision(true, true, true, false)
  }, [scene.physics.world])

  // set ball position to paddle when game is in START state
  useGameLoop(
    useCallback(() => {
      if (paddleRef.current && state.state === BreakoutFiniteState.START) {
        // setBallPos({ x: paddleRef.current.x, y: paddleRef.current.y - 64 })
      }
    }, [state.state])
  )

  useInputEvent(
    'pointerdown',
    useCallback(() => {
      dispatch({ type: BreakoutFiniteState.PLAY })
    }, [])
  )

  useLayoutEffect(() => {
    if (ballRef.current) {
      ballRef.current.setVelocity(-75, -300)
    }
  }, [])

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
      <Ball
        ref={ballRef}
        x={ballPos.x}
        y={ballPos.y}
        bounce={1}
        collideWorldBounds
        debugBodyColor={0xff0000}
        debugShowBody
        debugShowVelocity
      />
      <Paddle ref={paddleRef} initialX={400} initialY={700} />

      {/* Colliders */}
      <ArcadeCollider
        between={[ballRef, paddleRef]}
        onCollide={useCallback((ball, paddle) => {
          // ball hits paddle, randomize direction
          if (ball.x < paddle.x) {
            const diff = paddle.x - ball.x
            ball.setVelocityX(-10 * diff)
          } else if (ball.x > paddle.x) {
            const diff = ball.x - paddle.x
            ball.setVelocityX(10 * diff)
          } else {
            ball.setVelocityX(2 + Math.random() * 8)
          }
        }, [])}
      />
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
