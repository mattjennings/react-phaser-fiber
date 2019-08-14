import * as Phaser from 'phaser'
import React, { useMemo, useState, useEffect } from 'react'
import GameContext from './GameContext'

export interface GameProps extends Phaser.Types.Core.GameConfig {
  children?: JSX.Element | JSX.Element[]
}

function Game({ children, canvas, ...config }: GameProps): JSX.Element {
  const [booting, setBooting] = useState(true)

  const game = useMemo(() => {
    const phaserGame = new Phaser.Game({ ...config })

    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore
      window.game = phaserGame
    }

    phaserGame.events.on('ready', () => {
      setBooting(false)
    })

    return phaserGame
  }, [JSON.stringify(config)]) // eslint-disable-next-line react-hooks/exhaustive-deps

  // todo: loading screen? customizable?
  if (booting) {
    return null
  }

  return (
    <GameContext.Provider value={game}>
      {canvas}
      {children}
    </GameContext.Provider>
  )
}

export default Game
