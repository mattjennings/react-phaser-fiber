import { useScene } from './useScene'
import { useEffect } from 'react'
import invariant from 'fbjs/lib/invariant'

export function useGamepadEvent(event: string, callback: (event: any) => any) {
  const scene = useScene()

  useEffect(() => {
    invariant(
      !!scene,
      '`useGamepadEvent` could not find the scene. Make sure it is used in a component that is a child of <Scene />'
    )

    scene.input.gamepad.on(event, callback)

    return () => {
      scene.input.gamepad.off(event, callback)
    }
  }, [scene, event, callback])
}
