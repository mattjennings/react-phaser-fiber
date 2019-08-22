import { useContext } from 'react'
import SpawnerContext from '../components/Spawner/SpawnerContext'

export default function useSpawner() {
  return useContext(SpawnerContext)
}
