import * as Phaser from 'phaser'
import * as React from 'react'
import { useEffect, useMemo } from 'react'
import useGame from '../../hooks/useGame'
import SceneContext from './SceneContext'
import { PhaserFiber } from '../../reconciler'
import withGame, { WithGameProps } from '../Game/withGame'
import { FiberRoot } from 'react-reconciler'

export interface SceneProps extends Phaser.Types.Scenes.SettingsConfig {
  sceneKey: string
  children?: JSX.Element | JSX.Element[]
}

class Scene extends React.Component<SceneProps & WithGameProps> {
  scene: Phaser.Scene
  mountNode: FiberRoot

  componentDidMount() {
    const { sceneKey, children, game, ...options } = this.props

    this.scene = new Phaser.Scene({
      ...options,
      key: sceneKey,
    })

    game.scene.add(sceneKey, this.scene, true)

    this.mountNode = PhaserFiber.createContainer(this.scene, false, false)

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
    const { children } = this.props
    return (
      <SceneContext.Provider value={this.scene}>
        {children}
      </SceneContext.Provider>
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
  }

  render() {
    return null as JSX.Element
  }
}

export default withGame(Scene)
