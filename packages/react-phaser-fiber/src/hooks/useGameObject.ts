import { useRef, useEffect, useMemo, useState } from 'react'
import { Scene } from 'phaser'
import useScene from './useScene'

export interface UseGameObjectOptions {
  /**
   * Adds to the scene without needing to render in a <GameObject /> component
   */
  addToScene?: boolean
}
export default function useGameObject<T extends Phaser.GameObjects.GameObject>(
  creator: (scene: Scene) => T,
  options: UseGameObjectOptions = {}
) {
  const { addToScene } = options
  const scene = useScene()
  const ref = useRef(creator(scene))

  useEffect(() => {
    if (addToScene) {
      scene.add.existing(ref.current)

      // is this the right way to do this? Physics objects need to be added via scene.physics.add ...
      if (ref.current.constructor.name.includes('Arcade')) {
        scene.physics.add.existing(ref.current)
      }
    }

    return () => {
      ref.current.destroy()
    }
  }, [])

  return ref.current
}
