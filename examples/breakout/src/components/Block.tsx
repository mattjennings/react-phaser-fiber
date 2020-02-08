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

function Block(
  { ballRef, onBallHit, ...props }: BlockProps,
  ref: React.Ref<Phaser.Physics.Arcade.Image>
) {
  // useArcadeCollider(
  //   blockRef,
  //   ballRef,
  //   useCallback(
  //     block => {
  //       onBallHit(block)
  //     },
  //     [onBallHit]
  //   )
  // )
  return <ArcadeImage ref={ref} texture="assets" immovable {...props} />
}

export default React.forwardRef(Block)
