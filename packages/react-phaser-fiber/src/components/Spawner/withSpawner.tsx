import * as React from 'react'
import SpawnerContext, { SpawnerContextValue } from './SpawnerContext'

export interface WithSpawnerProps {
  spawner: SpawnerContextValue
}

const withSpawner = <T extends WithSpawnerProps>(
  Component: React.ComponentType<T>
) => {
  function WithSpawner(props: Omit<T, keyof WithSpawnerProps>) {
    return (
      <SpawnerContext.Consumer>
        {spawner => <Component {...(props as T)} spawner={spawner} />}
      </SpawnerContext.Consumer>
    )
  }

  WithSpawner.displayName = `WithSpawner(${Component.displayName})`

  return WithSpawner
}

export default withSpawner
