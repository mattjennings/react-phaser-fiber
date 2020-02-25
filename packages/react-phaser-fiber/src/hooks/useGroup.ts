import React, { useContext } from 'react'

export const GroupContext = React.createContext<
  Phaser.GameObjects.Group | Phaser.Physics.Arcade.Group
>(null)

export function useGroup<
  T extends Phaser.GameObjects.Group | Phaser.Physics.Arcade.Group
>() {
  return useContext(GroupContext) as T
}
