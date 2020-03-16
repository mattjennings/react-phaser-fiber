import React, { useContext, useMemo, useReducer, useState } from 'react'

interface GameStateValue {
  state: 'playing' | 'gameover' | 'win'
  lives: number
  score: number
  loseLife: () => any
  addScore: (score: number) => any
  gameOver: () => any
  win: () => any
  reset: () => any
}

const GameStateContext = React.createContext<GameStateValue>({
  state: 'playing',
  lives: 0,
  score: 0,
  loseLife: () => {},
  addScore: () => {},
  gameOver: () => {},
  win: () => {},
  reset: () => {},
})

export default function GameState({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0)
  const [state, dispatch] = useReducer(reducer, {
    state: 'playing',
    lives: 3,
    score: 0,
  })

  const value = useMemo<GameStateValue>(
    () => ({
      ...state,
      loseLife: () => dispatch({ type: 'LOSE_LIFE' }),
      addScore: score => dispatch({ type: 'ADD_SCORE', payload: score }),
      gameOver: () => dispatch({ type: 'GAME_OVER' }),
      win: () => dispatch({ type: 'WIN' }),
      reset: () => {
        setKey(Math.random())
        dispatch({ type: 'RESET' })
      },
    }),
    [state]
  )

  return (
    <GameStateContext.Provider key={key} value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

function reducer(
  state: Pick<GameStateValue, 'state' | 'lives' | 'score'>,
  action: { type: string; payload?: any }
): typeof state {
  switch (action.type) {
    case 'LOSE_LIFE': {
      return { ...state, lives: state.lives - 1 }
    }
    case 'ADD_SCORE': {
      return { ...state, score: state.score + action.payload }
    }
    case 'GAME_OVER': {
      return { ...state, lives: 0, state: 'gameover' }
    }
    case 'WIN': {
      return { ...state, state: 'win' }
    }
    case 'RESET': {
      return {
        state: 'playing',
        lives: 3,
        score: 0,
      }
    }
  }
  return state
}

export function useGameState() {
  return useContext(GameStateContext)
}
