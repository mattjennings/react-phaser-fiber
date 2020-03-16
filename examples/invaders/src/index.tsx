import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Spawner } from 'react-phaser-fiber'
import Background from './Background'
import Enemies from './Enemies'
import Player from './Player'
import UI from './UI'
import GameState from './GameState'

const App = () => {
  return (
    <Game
      width={800}
      height={600}
      physics={{
        default: 'arcade',
        arcade: {
          // debug: true,
        },
      }}
      scale={{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      }}
    >
      <Scene
        sceneKey="main"
        onPreload={scene => {
          scene.load.image('textures/starfield', 'starfield.png')
          scene.load.spritesheet('textures/enemy', 'invader.png', {
            frameWidth: 32,
            frameHeight: 32,
          })
          scene.load.spritesheet('textures/explosion', 'explode.png', {
            frameWidth: 128,
            frameHeight: 128,
          })
          scene.load.image('textures/player', 'player.png')
          scene.load.image('textures/player/bullet', 'bullet.png')
          scene.load.image('textures/enemy/bullet', 'enemy-bullet.png')
        }}
        onCreate={scene => {
          scene.anims.create({
            key: 'anims/enemy/fly',
            frames: scene.anims.generateFrameNumbers('textures/enemy', {
              start: 0,
              end: 4,
            }),
            frameRate: 10,
            repeat: -1,
          })
          scene.anims.create({
            key: 'anims/explosion',
            frames: scene.anims.generateFrameNumbers('textures/explosion', {
              start: 0,
              end: 16,
            }),
            frameRate: 24,
          })
        }}
      >
        <GameState>
          <Spawner>
            <Background />
            <UI />
            <Enemies />
            <Player x={300} y={500} />
          </Spawner>
        </GameState>
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
