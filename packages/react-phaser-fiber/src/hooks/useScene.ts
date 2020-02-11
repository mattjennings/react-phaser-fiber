import { useContext } from 'react'
import SceneContext from '../components/Scene/SceneContext'

export function useScene() {
  return useContext(SceneContext)
}
