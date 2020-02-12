import React, {
  useCallback,
  useReducer,
  useRef,
  useEffect,
  useMemo,
} from 'react'
import {
  useGameLoop,
  useInputEvent,
  useScene,
  Image,
  Group,
  ArcadeImage,
} from 'react-phaser-fiber'
import Platform from './Platform'
import Player from './Player'

export default function Platformer() {
  return (
    <>
      <Player x={100} y={450} />
      <Image x={400} y={300} texture="sky" />
      <Group name="platforms">
        <Platform x={400} y={568} scale={2} physicsType="static" />
        <Platform moving x={400} y={400} />
      </Group>
    </>
  )
}
