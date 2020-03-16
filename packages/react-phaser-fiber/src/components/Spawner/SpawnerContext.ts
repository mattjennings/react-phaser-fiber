import * as React from 'react'

export interface SpawnerContextValue {
  /**
   * Spawn a component into the parent <Spawner> component
   *
   * `component` will be passed an `onDestroy` prop from the spawner. This should
   * be called when the component needs to be unmounted.
   */
  spawn: <T extends SpawnProps>(
    component: React.ComponentType<T>,
    props: Omit<T, keyof SpawnProps>
  ) => string
}

export interface SpawnProps {
  onDestroy: () => any
}

const SpawnerContext = React.createContext<SpawnerContextValue>({
  spawn: (() => null as any) as any,
})

export default SpawnerContext
