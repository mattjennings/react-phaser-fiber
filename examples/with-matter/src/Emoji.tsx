import React, { useMemo, useEffect, useRef } from 'react'
import {
  MatterSprite,
  MatterSpriteProps,
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

  return (
    <MatterSprite
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
    />
  )
}

export default Emoji
