import React, { useCallback, useRef } from 'react'
import {
  ArcadeImage,
  ArcadeImageProps,
  useArcadeCollider,
} from 'react-phaser-fiber'

export interface BlockProps extends Omit<ArcadeImageProps, 'texture'> {
  ballRef: React.RefObject<Phaser.Physics.Arcade.Image>
  onBallHit: (block: Phaser.Physics.Arcade.Image) => any
}

function Block({ ballRef, onBallHit, ...props }: BlockProps) {
  const blockRef = useRef<Phaser.Physics.Arcade.Image>(null)

  useArcadeCollider(
    blockRef,
    ballRef,
    useCallback(
      block => {
        onBallHit(block)
      },
      [onBallHit]
    )
  )
  return <ArcadeImage ref={blockRef} texture="assets" immovable {...props} />
}

export default Block
