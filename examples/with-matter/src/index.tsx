import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Spawner, Text } from 'react-phaser-fiber'
import EmojiSpawner from './EmojiSpawner'

const App = () => {
  return (
    <Game
      width={600}
      height={600}
      physics={{
        default: 'matter',
      }}
      scale={{
        mode: Phaser.Scale.FIT,
      }}
    >
      <Scene
        sceneKey="main"
        onPreload={scene => {
          scene.load.tilemapTiledJSON('map', 'assets/tilemaps/level.json')
          scene.load.image(
            'kenney-tileset-64px-extruded',
            'assets/tilesets/kenney-tileset-64px-extruded.png'
          )
          scene.load.atlas(
            'emoji',
            'assets/atlases/emoji.png',
            'assets/atlases/emoji.json'
          )
        }}
        onCreate={scene => {
          const map = scene.make.tilemap({ key: 'map' })
          const tileset = map.addTilesetImage('kenney-tileset-64px-extruded')
          const groundLayer = map.createDynamicLayer('Ground', tileset, 0, 0)
          const lavaLayer = map.createDynamicLayer('Lava', tileset, 0, 0)

          // Set colliding tiles before converting the layer to Matter bodies
          groundLayer.setCollisionByProperty({ collides: true })
          lavaLayer.setCollisionByProperty({ collides: true })

          // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
          // haven't mapped our collision shapes in Tiled so each colliding tile will get a default
          // rectangle body (similar to AP).
          scene.matter.world.convertTilemapLayer(groundLayer)
          scene.matter.world.convertTilemapLayer(lavaLayer)

          scene.anims.create({
            key: 'idle',
            frames: [{ key: 'emoji', frame: '1f62c' }],
            frameRate: 8,
            repeat: 0,
          })
          // Create an angry emoji => grimace emoji animation
          scene.anims.create({
            key: 'angry',
            frames: [
              { key: 'emoji', frame: '1f92c' },
              { key: 'emoji', frame: '1f92c' },
              { key: 'emoji', frame: '1f92c' },
              { key: 'emoji', frame: '1f92c' },
              { key: 'emoji', frame: '1f92c' },
              { key: 'emoji', frame: '1f92c' },
              { key: 'emoji', frame: '1f92c' },
              { key: 'emoji', frame: '1f62c' },
            ],
            frameRate: 8,
            repeat: 0,
          })

          // Our canvas is "clickable" so let's update the cursor to a custom pointer
          scene.input.setDefaultCursor(
            'url(assets/cursors/pointer.cur), pointer'
          )
          scene.matter.world.on(
            'collisionstart',
            (event: Phaser.Physics.Matter.Events.CollisionStartEvent) => {
              event.pairs.forEach(pair => {
                const { bodyA, bodyB } = pair
                const gameObjectA = bodyA.gameObject
                const gameObjectB = bodyB.gameObject

                const aIsEmoji =
                  gameObjectA instanceof Phaser.Physics.Matter.Sprite
                const bIsEmoji =
                  gameObjectB instanceof Phaser.Physics.Matter.Sprite

                if (aIsEmoji) {
                  gameObjectA.setAlpha(0.5)
                  gameObjectA.anims.play('angry', true)
                }
                if (bIsEmoji) {
                  gameObjectB.setAlpha(0.5)
                  gameObjectB.anims.play('angry', true)
                }
                scene.anims.resumeAll()
              })
            }
          )

          scene.matter.world.on(
            'collisionend',
            (event: Phaser.Physics.Matter.Events.CollisionEndEvent) => {
              event.pairs.forEach(pair => {
                const { bodyA, bodyB } = pair
                const gameObjectA = bodyA.gameObject
                const gameObjectB = bodyB.gameObject

                const aIsEmoji =
                  gameObjectA instanceof Phaser.Physics.Matter.Sprite
                const bIsEmoji =
                  gameObjectB instanceof Phaser.Physics.Matter.Sprite

                if (aIsEmoji) {
                  gameObjectA.setAlpha(1)
                  // gameObjectA.play('idle', true)
                }
                if (bIsEmoji) {
                  gameObjectB.setAlpha(1)
                  // gameObjectB.play('idle', true)
                }
              })
            }
          )

          // scene.cameras.main.setBounds(
          //   0,
          //   0,
          //   map.widthInPixels,
          //   map.heightInPixels
          // )

          // const cursors = scene.input.keyboard.createCursorKeys()
          // const controlConfig = {
          //   camera: scene.cameras.main,
          //   left: cursors.left,
          //   right: cursors.right,
          //   up: cursors.up,
          //   down: cursors.down,
          //   speed: 0.5,
          // }
          // const controls = new Phaser.Cameras.Controls.FixedKeyControl(
          //   controlConfig
          // )
        }}
        renderLoading={progress => (
          <Text
            x={200}
            y={200}
            text={`Loading... (${progress * 100}%)`}
            style={{ color: 'white' }}
          />
        )}
      >
        <Spawner>
          <Text
            x={35}
            y={200}
            style={{ color: 'white' }}
            text="Left-click to emoji.\nArrows to move camera."
          />
          <EmojiSpawner />
        </Spawner>
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
