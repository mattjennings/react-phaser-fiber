import * as React from 'react'

export interface SpawnerContextValue {
  /**
   * Spawn a component into the parent <Spawner> component
   *
   * `component` will be passed an `onDestroy` prop from the spawner. This should
   * be called when the component needs to be unmounted.
   */
  spawn: <P>(component: React.ComponentType<P>, props: P & SpawnProps) => string
}

export interface SpawnProps {
  onDestroy?: () => any
}

const SpawnerContext = React.createContext<SpawnerContextValue>(null)

export default SpawnerContext
