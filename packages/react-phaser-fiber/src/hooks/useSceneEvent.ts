import { useEffect } from 'react'
import { useScene } from './useScene'

export function useSceneEvent(
  event: string,
  onEvent: (...eventArgs: any) => any
) {
  const scene = useScene()

  useEffect(() => {
    scene.events.on(event, onEvent)

    return () => {
      scene.events.off(event, onEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEvent])
}
