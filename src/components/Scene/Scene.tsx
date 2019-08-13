import * as Phaser from 'phaser'
import { useEffect } from 'react'
import useGame from '../../hooks/useGame'

export interface SceneProps extends Phaser.Types.Scenes.SettingsConfig {
  sceneKey: string
  children?: JSX.Element
}

export default function Scene({ children, sceneKey, ...config }: SceneProps) {
  const game = useGame()
  game.loop.callback
  useEffect(() => {
    game.scene.add(sceneKey, config)

    return () => {
      game.scene.remove(sceneKey)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (children) {
    return children
  }

  return (null as unknown) as JSX.Element
}
