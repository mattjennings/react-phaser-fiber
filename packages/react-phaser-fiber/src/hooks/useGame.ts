import { useContext } from 'react'
import GameContext from '../components/Game/GameContext'

export function useGame() {
  return useContext(GameContext)
}
