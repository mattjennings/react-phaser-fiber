import React, { useCallback } from 'react'
import {
  MatterCollider,
  MatterSprite,
  MatterSpriteProps,
  SpawnProps,
} from 'react-phaser-fiber'

export type EmojiProps = Omit<MatterSpriteProps, 'texture'> & SpawnProps

function Emoji(props: EmojiProps) {
  const handleCollide = useCallback((self: Phaser.Physics.Matter.Sprite) => {
    self.setAlpha(0.5)
    self.anims.play('angry', true)
  }, [])

  const handleCollideEnd = useCallback((self: Phaser.Physics.Matter.Sprite) => {
    self.setAlpha(1)
  }, [])

  return (
    <MatterSprite
      name="emoji"
      texture="emoji"
      animation="idle"
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
        onCollide={handleCollide}
        onCollideEnd={handleCollideEnd}
      />
    </MatterSprite>
  )
}

export default Emoji
