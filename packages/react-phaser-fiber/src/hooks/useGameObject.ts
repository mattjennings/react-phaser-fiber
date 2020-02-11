import { useContext } from 'react'
import { GameObjectContext } from '../components/GameObject'

export function useGameObject<T extends Phaser.GameObjects.GameObject>() {
  return useContext(GameObjectContext) as T
}
