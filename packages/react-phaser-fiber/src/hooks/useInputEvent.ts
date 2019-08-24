import useScene from './useScene'
import { useEffect } from 'react'
import invariant from 'fbjs/lib/invariant'

export default function useInputEvent(event: string, callback: Function) {
  const scene = useScene()

  useEffect(() => {
    invariant(
      !!scene,
      '`useInputEvent` could not find the scene. Make sure it is used in a component that is a child of <Scene />'
    )

    scene.input.on(event, callback)

    return () => {
      scene.input.off(event, callback)
    }
  }, [scene, event, callback])
}
