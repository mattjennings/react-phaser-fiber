import Phaser from 'phaser'
import React, {
  useLayoutEffect,
  useMemo,
  useState,
  useImperativeHandle,
  useRef,
} from 'react'
import { useGame } from '../../hooks/useGame'
import SceneContext from './SceneContext'

export interface SceneProps extends Phaser.Types.Scenes.SettingsConfig {
  /**
   * The unique key of this Scene. Must be unique within the entire Game instance
   */
  sceneKey: string

  children?: JSX.Element | JSX.Element[] | React.ReactNode

  /**
   * Called on the Scene's preload stage. Any assets for the scene should be loaded here
   */
  onPreload?: (scene: Phaser.Scene) => any

  /**
   * Called when the scene has finished preloading
   */
  onLoaded?: (scene: Phaser.Scene) => any

  /**
   * Called on the Scene's `create` stage
   */
  onCreate?: (scene: Phaser.Scene) => any

  /**
   * Caled on the Scene's init stage.
   */
  onInit?: (scene: Phaser.Scene) => any

  /**
   * Render prop that is called with the progress while the Scene is loading assets. Use this for loading screens.
   */
  renderLoading?: (progress: number) => React.ReactNode
}

function Scene(
  {
    sceneKey,
    children,
    renderLoading = () => null,
    onPreload,
    onLoaded,
    onCreate,
    onInit,
    ...options
  }: SceneProps,
  ref: React.Ref<Phaser.Scene>
) {
  const game = useGame()
  const [loading, setLoading] = useState(!!onPreload)
  const [loadProgress, setLoadProgress] = useState(0)

  const listeners = useRef<Phaser.Events.EventEmitter[]>([])

  const scene = useMemo(() => {
    const instance = new Phaser.Scene({
      ...options,
      key: sceneKey,
    })

    // @ts-ignore
    instance.preload = onPreload
      ? () => {
          onPreload(instance)
          listeners.current.push(
            instance.load.once('complete', () => {
              onLoaded?.(instance)
              setLoading(false)
              setLoadProgress(0)
            })
          )
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
    // can we use suspense instead somehow?
    listeners.current.push(
      scene.load.on('progress', (progress: number) => {
        setLoadProgress(progress)
      })
    )

    return () => {
      game.scene.remove(sceneKey)

      listeners.current.forEach((listener) => {
        listener.eventNames().forEach((event) => listener.off(event))
      })
    }
  }, [])

  // emit custom events when children are added or removed
  useLayoutEffect(() => {
    if (!loading) {
      const origAdd = scene.children.addCallback
      scene.children.addCallback = (...args: any[]) => {
        if (origAdd) {
          origAdd(...args)
        }
        scene.events.emit('CHILD_ADDED', ...args)
      }

      const origRemove = scene.children.removeCallback
      scene.children.removeCallback = (...args: any[]) => {
        if (origRemove) {
          origRemove(...args)
        }
        scene.events.emit('CHILD_REMOVED', ...args)
      }
    }
  }, [loading])

  return (
    <SceneContext.Provider value={scene}>
      {loading && renderLoading ? renderLoading(loadProgress) : children}
    </SceneContext.Provider>
  )
}

export default React.forwardRef(Scene)
