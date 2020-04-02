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
  children?: JSX.Element | JSX.Element[] | React.ReactNode
  onPreload?: (scene: Phaser.Scene) => any
  onCreate?: (scene: Phaser.Scene) => any
  onInit?: (scene: Phaser.Scene) => any
  renderLoading?: (progress: number) => React.ReactNode
}

function Scene(
  {
    sceneKey,
    children,
    renderLoading,
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
    const instance = new Phaser.Scene({
      ...options,
      key: sceneKey,
    })

    // @ts-ignore
    instance.preload = onPreload
      ? () => {
          onPreload(instance)
          instance.load.once('complete', () => {
            setLoading(false)
            setLoadProgress(0)
          })
          instance.load.start()
        }
      : null

    // @ts-ignore
    instance.create = onCreate ? () => onCreate(instance) : null
    // @ts-ignore
    instance.init = onInit ? () => onInit(instance) : null

    game.scene.add(sceneKey, instance, true)

    return instance
  }, [])

  useImperativeHandle(ref, () => scene)

  useLayoutEffect(() => {
    const listeners: Phaser.Events.EventEmitter[] = []

    // can we use suspense instead somehow?
    listeners.push(
      scene.load.once('start', () => {
        setLoading(!!onPreload)
      }),

      scene.load.on('progress', (progress: number) => {
        setLoadProgress(progress)
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
