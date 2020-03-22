import Phaser from 'phaser'
import React from 'react'
import { FiberRoot } from 'react-reconciler'
import GameContext from './GameContext'
import { withCanvas, WithCanvas } from '../Canvas/Canvas'
import { PhaserFiber, injectDevtools } from '../../reconciler/reconciler'

export interface GameProps
  extends Omit<Phaser.Types.Core.GameConfig, 'canvas'> {
  children?: JSX.Element | JSX.Element[]
}

class Game extends React.Component<
  GameProps & WithCanvas,
  { booting: boolean }
> {
  static displayName = 'Game'
  mountNode: FiberRoot
  game: Phaser.Game

  constructor(props: GameProps & WithCanvas) {
    super(props)
    const { children, canvas, ...config } = props

    this.game = new Phaser.Game({
      canvas,
      type: canvas ? Phaser.CANVAS : Phaser.AUTO,
      ...config,
    })

    this.state = {
      booting: true,
    }

    this.game.events.on('ready', () => {
      this.setState({ booting: false })
    })

    if (process.env.NODE_ENV === 'development' && window) {
      // @ts-ignore
      window.game = this.game
    }
  }

  componentDidMount() {
    const { children, canvas, ...config } = this.props

    this.mountNode = PhaserFiber.createContainer(this.game, false, false)

    injectDevtools()

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
    const children = this.state.booting ? null : this.props.children

    return (
      <GameContext.Provider value={this.game}>{children}</GameContext.Provider>
    )
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(`Error occurred in \`Game\`.`)
    console.error(error)
    console.error(errorInfo)
  }

  componentWillUnmount() {
    PhaserFiber.updateContainer(null, this.mountNode, this, null as any)
    this.game.destroy(!this.props.canvas)
  }

  render() {
    return null as JSX.Element
  }
}

export default withCanvas(Game)
