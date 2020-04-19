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
        onPreload={(scene) => {
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
        onCreate={(scene) => {
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
        }}
        renderLoading={(progress) => (
          <Text
            x={200}
            y={200}
            text={`Loading... (${progress * 100}%)`}
            color="white"
          />
        )}
      >
        <Spawner>
          <Text
            x={35}
            y={200}
            color="white"
            text="Left-click to emoji.\nArrows to move camera."
          />
          <EmojiSpawner />
        </Spawner>
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
