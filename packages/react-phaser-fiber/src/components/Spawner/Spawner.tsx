import React, { useMemo, useReducer } from 'react'
import SpawnerContext, { SpawnerContextValue } from './SpawnerContext'
import uuid from 'uuid/v4'

export interface SpawnerProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode
}

export interface SpawnedChild<P = any> {
  component: React.ComponentType<P>
  props: P
  key: string
}

export default function Spawner({ children }: SpawnerProps) {
  const [state, dispatch] = useReducer(reducer, { children: [] })

  const handleDestroy = (key: string) => {
    dispatch({ type: 'DESTROY_CHILD', payload: key })
  }

  const value = useMemo<SpawnerContextValue>(
    () => ({
      spawn: (component, props) => {
        const key = uuid()
        dispatch({ type: 'SPAWN', payload: { component, props, key } })
        return key
      },
    }),
    [state]
  )

  return (
    <SpawnerContext.Provider value={value}>
      {state.children.map(child => {
        return (
          <child.component
            key={child.key}
            {...child.props}
            onDestroy={() => {
              if (child.props.onDestroy) {
                child.props.onDestroy()
              }
              handleDestroy(child.key)
            }}
          />
        )
      })}
      {children}
    </SpawnerContext.Provider>
  )
}

interface SpawnerState {
  children: SpawnedChild[]
}

function reducer(state: SpawnerState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'SPAWN':
      return {
        ...state,
        children: [...state.children, action.payload],
      }
    case 'DESTROY_CHILD':
      return {
        ...state,
        children: state.children.filter(child => child.key !== action.payload),
      }
  }

  return state
}
