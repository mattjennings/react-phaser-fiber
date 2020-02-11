import { useRef, useLayoutEffect } from 'react'
import { Scene } from 'phaser'
import useScene from './useScene'

export interface UseGameObjectOptions {
  /**
   * Adds to the scene without needing to render in a <GameObject /> component
   */
  addToScene?: boolean

  physics?: 'arcade'
}

export default function useGameObject<T extends Phaser.GameObjects.GameObject>(
  creator: (scene: Scene) => T,
  options: UseGameObjectOptions = {}
) {
  const { addToScene, physics } = options
  const scene = useScene()
  const ref = useRef(creator(scene))

  useLayoutEffect(() => {
    if (addToScene) {
      scene.add.existing(ref.current)
    }

    if (physics === 'arcade') {
      scene.physics.add.existing(ref.current)
    }

    return () => {
      ref.current.destroy()
    }
  }, [])

  return ref.current
}
