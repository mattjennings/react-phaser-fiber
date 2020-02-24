import React from 'react'
import { useContext } from 'react'

export const GameObjectContext = React.createContext<
  Phaser.GameObjects.GameObject
>(null)

export function useGameObject<T extends Phaser.GameObjects.GameObject>() {
  return useContext(GameObjectContext) as T
}
