import * as React from 'react'
import GameContext from './GameContext'

export interface WithGameProps {
  game: Phaser.Game
}

const withGame = <T extends WithGameProps>(
  Component: React.ComponentType<T>
) => {
  function WithGame(props: Omit<T, keyof WithGameProps>) {
    return (
      <GameContext.Consumer>
        {game => <Component {...(props as T)} game={game} />}
      </GameContext.Consumer>
    )
  }

  WithGame.displayName = `WithGame(${Component.displayName})`

  return WithGame
}

export default withGame
