import useScene from './useScene'
import { useEffect } from 'react'

export default function useInputEvent(event: string, callback: Function) {
  const scene = useScene()

  useEffect(() => {
    if (scene) {
      scene.input.on(event, callback)

      return () => {
        scene.input.off(event, callback)
      }
    }
  }, [scene, event, callback])
}
