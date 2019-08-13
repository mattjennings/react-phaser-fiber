import { useContext } from 'react'
import GameContext from '../components/Game/GameContext'

export default function useGame() {
  const { game } = useContext(GameContext)

  return game
}
