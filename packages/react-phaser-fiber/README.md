# react-phaser-fiber

Create Phaser 3 games using React. Heavily inspired by [@inlet/react-pixi](https://github.com/inlet/react-pixi).

This is _very_ much a work in progress. The following components are provided (linked to their respective Phaser class):

- [Game](https://photonstorm.github.io/phaser3-docs/Phaser.Game.html)
- [Scene](https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html)
- [Text](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html)
- [Image](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Image.html)
- [Sprite](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html)
- [Group](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html)
- [ArcadeImage](https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Image.html)
- [ArcadeSprite](https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Sprite.html)
- [ArcadeCollider](https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Collider.html)
- [TileSprite](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.TileSprite.html)

The current goal is to support all GameObjects and Physics.Arcade objects. After that, I'll look at adding Matter and Impact components.

# Examples

## Games

[Breakout](https://codesandbox.io/s/github/mattjennings/react-phaser-fiber/tree/master/examples/breakout) (recreated from [official Phaser example](https://labs.phaser.io/edit.html?src=src\games\breakout\breakout.js))

[Basic Platformer](https://codesandbox.io/s/github/mattjennings/react-phaser-fiber/tree/master/examples/basic-platformer) (recreated from [official Phaser example](https://labs.phaser.io/edit.html?src=src/physics/arcade/basic%20platform.js&v=3.22.0))

## Other

[Spawning Components](https://codesandbox.io/s/github/mattjennings/react-phaser-fiber/tree/master/examples/spawner)

# Getting Started

## Install

```cli
npm install react-phaser-fiber
```

## Create a game

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Game, Scene, Text } from 'react-phaser-fiber'

const App = () => {
  return (
    <Game width={400} height={400}>
      <Scene sceneKey="main">
        <Text x={100} y={100} text="Hello World!" style={{ color: 'white' }} />
      </Scene>
    </Game>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

[![Edit Hello World](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mattjennings/react-phaser-fiber/tree/master/examples/hello-world)

There will be proper documentation eventually, but for now look through the examples to see what else is possible.
