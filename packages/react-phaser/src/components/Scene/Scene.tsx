import * as Phaser from 'phaser'
import * as React from 'react'
import SceneContext from './SceneContext'
import { PhaserFiber } from '../../reconciler'
import withGame, { WithGameProps } from '../Game/withGame'
import { FiberRoot } from 'react-reconciler'
import GameContext from '../Game/GameContext'
import { VERSION, PACKAGE_NAME } from '../../reconciler'

export interface SceneProps extends Phaser.Types.Scenes.SettingsConfig {
  sceneKey: string
  children?: JSX.Element | JSX.Element[]
  onPreload?: (scene: Phaser.Scene) => any
  onCreate?: (scene: Phaser.Scene) => any
  onInit?: (scene: Phaser.Scene) => any
  loadingFallback?: (progress: number) => JSX.Element
}

export interface SceneState {
  loading?: boolean
  loadProgress?: number
}

class Scene extends React.Component<SceneProps & WithGameProps, SceneState> {
  static displayName = 'Scene'

  scene: Phaser.Scene
  mountNode: FiberRoot
  listeners: Phaser.Events.EventEmitter[] = []

  constructor(props: SceneProps & WithGameProps) {
    super(props)

    this.state = {
      loading: props.onPreload ? true : false,
      loadProgress: 0,
    }
  }

  componentDidMount() {
    const {
      sceneKey,
      children,
      game,
      onPreload,
      onCreate,
      onInit,
      ...options
    } = this.props

    this.scene = new Phaser.Scene({
      ...options,
      key: sceneKey,
    })

    // @ts-ignore
    this.scene.preload = onPreload ? () => onPreload(this.scene) : null
    // @ts-ignore
    this.scene.create = onCreate ? () => onCreate(this.scene) : null
    // @ts-ignore
    this.scene.init = onInit ? () => onInit(this.scene) : null

    game.scene.add(sceneKey, this.scene, true)

    this.mountNode = PhaserFiber.createContainer(this.scene, false, false)

    injectDevtools()

    // can we use suspense instead somehow?
    this.listeners.push(
      this.scene.load.on('start', () => {
        this.setState({ loading: true })
      }),

      this.scene.load.on('progress', (progress: number) => {
        this.setState({
          loadProgress: progress,
        })
      }),

      this.scene.load.on('complete', () => {
        this.setState({
          loading: false,
          loadProgress: 0,
        })
      })
    )

    PhaserFiber.updateContainer(
      this.getChildren(),
      this.mountNode,
      this,
      null as any
    )
  }

  componentDidUpdate() {
    // flush fiber
    PhaserFiber.updateContainer(
      this.getChildren(),
      this.mountNode,
      this,
      null as any
    )
  }

  getChildren() {
    const children =
      this.state.loading && this.props.loadingFallback
        ? this.props.loadingFallback(this.state.loadProgress)
        : this.props.children

    // we're not in the render so we need to recreate the Game Context
    // (can this be solved otherwise? it would be nice to preserve contexts above <Scene>)
    return (
      <GameContext.Provider value={this.props.game}>
        <SceneContext.Provider value={this.scene}>
          {children}
        </SceneContext.Provider>
      </GameContext.Provider>
    )
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(`Error occurred in \`Scene\`.`)
    console.error(error)
    console.error(errorInfo)
  }

  componentWillUnmount() {
    PhaserFiber.updateContainer(null, this.mountNode, this, null as any)
    this.props.game.scene.remove(this.props.sceneKey)

    this.listeners.forEach(listener => {
      listener.eventNames().forEach(event => listener.off(event))
    })
    this.listeners = []
  }

  render() {
    return null as JSX.Element
  }
}

/**
 * Inject into React Devtools
 */
function injectDevtools() {
  PhaserFiber.injectIntoDevTools({
    bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
    version: VERSION,
    rendererPackageName: PACKAGE_NAME,
    findFiberByHostInstance: PhaserFiber.findHostInstance as any,
  })
}

export default withGame(Scene)
