import { useContext } from 'react'
import GameContext from '../components/Game/GameContext'

export default function useGame() {
  return useContext(GameContext)
}
