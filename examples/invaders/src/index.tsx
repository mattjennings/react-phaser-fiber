import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Spawner } from 'react-phaser-fiber'
import Background from './Background'
import Enemies from './Enemies'

const App = () => {
  return (
    <Game
      width={800}
      height={600}
      physics={{
        default: 'arcade',
      }}
      scale={{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      }}
    >
      <Scene
        sceneKey="main"
        onPreload={scene => {
          scene.load.image('starfield', 'starfield.png')
          scene.load.image('bullet', 'bullet.png')
          scene.load.image('enemyBullet', 'enemy-bullet.png')
          scene.load.spritesheet('invader', 'invader.png', {
            frameWidth: 32,
            frameHeight: 32,
          })
          scene.load.spritesheet('kaboom', 'explode.png', {
            frameWidth: 128,
            frameHeight: 128,
          })
          scene.load.image('ship', 'player.png')
          scene.load.image('starfield', 'starfield.png')
        }}
      >
        <Spawner>
          <Enemies />
          <Background />
        </Spawner>
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
