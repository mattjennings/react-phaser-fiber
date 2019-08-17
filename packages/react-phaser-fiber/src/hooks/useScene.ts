import { useContext } from 'react'
import SceneContext from '../components/Scene/SceneContext'

export default function useScene() {
  return useContext(SceneContext)
}
