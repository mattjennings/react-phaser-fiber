import * as React from 'react'

export interface GameContextValue {
  game: Phaser.Game
}

const GameContext = React.createContext<GameContextValue>({
  game: null,
} as any)

export default GameContext
