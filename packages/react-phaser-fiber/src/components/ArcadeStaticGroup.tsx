import React, { useMemo, useContext } from 'react'
import { useScene } from '../hooks'

const ArcadeStaticGroupContext = React.createContext<
  Phaser.Physics.Arcade.StaticGroup
>(null)

export default function ArcadeStaticGroup(props: {
  children: React.ReactNode
}) {
  const scene = useScene()
  const group = useMemo(() => scene.physics.add.staticGroup(), [])

  return (
    <ArcadeStaticGroupContext.Provider value={group}>
      {props.children}
    </ArcadeStaticGroupContext.Provider>
  )
}

export function useArcadeStaticGroup() {
  return useContext(ArcadeStaticGroupContext)
}
