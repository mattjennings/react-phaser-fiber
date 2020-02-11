import { useContext } from 'react'
import SpawnerContext from '../components/Spawner/SpawnerContext'

export function useSpawner() {
  return useContext(SpawnerContext)
}
