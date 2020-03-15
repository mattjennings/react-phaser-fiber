import React, { useRef, useCallback } from 'react'
import {
  MatterSprite,
  MatterSpriteProps,
  MatterCollider,
  SpawnProps,
  useGameLoop,
} from 'react-phaser-fiber'

export type EmojiProps = Omit<MatterSpriteProps, 'texture'> & SpawnProps

function Emoji(props: EmojiProps) {
  const ref = useRef(null)
  useGameLoop(({ delta, time }) => {
    // Sprites don't seem to be in scene updateList
    // Manually updating animation but because of this or another
    // underlying bug that is ignoreing frameRate
    ;(ref.current! as Phaser.Physics.Matter.Sprite).anims.update(delta, time)
  })
  const onCollideStart = useCallback((gameObjectA, gameObjectB) => {
    const aIsEmoji = gameObjectA instanceof Phaser.Physics.Matter.Sprite
    const bIsEmoji = gameObjectB instanceof Phaser.Physics.Matter.Sprite

    if (aIsEmoji) {
      gameObjectA.setAlpha(0.5)
      gameObjectA.anims.play('angry', true)
    }
    if (bIsEmoji) {
      gameObjectB.setAlpha(0.5)
      gameObjectB.anims.play('angry', true)
    }
  }, [])

  const onCollideEnd = useCallback((gameObjectA, gameObjectB) => {
    const aIsEmoji = gameObjectA instanceof Phaser.Physics.Matter.Sprite
    const bIsEmoji = gameObjectB instanceof Phaser.Physics.Matter.Sprite
    if (aIsEmoji) {
      gameObjectA.setAlpha(1)
      // gameObjectA.play('idle', true)
    }
    if (bIsEmoji) {
      gameObjectB.setAlpha(1)
      // gameObjectB.play('idle', true)
    }
  }, [])

  return (
    <MatterSprite
      name="emoji"
      ref={ref}
      texture="emoji"
      frame="1f62c" // Setting initial frame manaully because default animation doesn't play
      animation="idle" // Todo this is not working?
      frameRate={8}
      isPlaying
      circle={{ radius: 30 }}
      friction={0.25}
      scale={0.5}
      bounce={0.8}
      {...props}
    >
      <MatterCollider
        with="emoji"
        onCollide={onCollideStart}
        onCollideEnd={onCollideEnd}
      />
    </MatterSprite>
  )
}

export default Emoji
