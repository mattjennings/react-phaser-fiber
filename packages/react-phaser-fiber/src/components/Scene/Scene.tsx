import * as Phaser from 'phaser'
import React, {
  useLayoutEffect,
  useMemo,
  useState,
  useImperativeHandle,
} from 'react'
import { useGame } from '../../hooks/useGame'
import SceneContext from './SceneContext'

export interface SceneProps extends Phaser.Types.Scenes.SettingsConfig {
  sceneKey: string
  children?: JSX.Element | JSX.Element[]
  onPreload?: (scene: Phaser.Scene) => any
  onCreate?: (scene: Phaser.Scene) => any
  onInit?: (scene: Phaser.Scene) => any
  renderLoading?: (progress: number) => React.ReactNode
}

function Scene(
  {
    sceneKey,
    children,
    renderLoading = () => null,
    onPreload,
    onCreate,
    onInit,
    ...options
  }: SceneProps,
  ref: React.Ref<Phaser.Scene>
) {
  const game = useGame()
  const [loading, setLoading] = useState(!!onPreload)
  const [loadProgress, setLoadProgress] = useState(0)

  const scene = useMemo(() => {
    const instance = game.scene.add(
      sceneKey,
      {
        ...options,
        preload: onPreload ? () => onPreload(instance) : null,
        create: onCreate ? () => onCreate(instance) : null,
        init: onInit ? () => onInit(instance) : null,
      },
      true
    )

    return instance
  }, [])

  useImperativeHandle(ref, () => scene)

  useLayoutEffect(() => {
    const listeners: Phaser.Events.EventEmitter[] = []

    // can we use suspense instead somehow?
    listeners.push(
      scene.load.on('progress', (progress: number) => {
        setLoadProgress(progress)
      }),

      scene.load.on('complete', () => {
        setLoading(false)
        setLoadProgress(0)
      }),

      scene.events.on('start', () => {
        setLoading(false)
      })
    )

    return () => {
      game.scene.remove(sceneKey)

      listeners.forEach(listener => {
        listener.eventNames().forEach(event => listener.off(event))
      })
    }
  }, [])

  return (
    <SceneContext.Provider value={scene}>
      {loading && renderLoading ? renderLoading(loadProgress) : children}
    </SceneContext.Provider>
  )
}

export default React.forwardRef(Scene)
