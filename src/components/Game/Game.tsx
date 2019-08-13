import * as Phaser from 'phaser'
import React, { useMemo } from 'react'
import GameContext from './GameContext'

export interface GameProps extends Phaser.Types.Core.GameConfig {
  children?: JSX.Element
}

export default function Game({ children, ...config }: GameProps) {
  const value = useMemo(
    () => ({
      game: new Phaser.Game(config),
    }),
    [config]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
