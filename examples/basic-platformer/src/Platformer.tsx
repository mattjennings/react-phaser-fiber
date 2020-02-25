import React from 'react'
import { Group, Image } from 'react-phaser-fiber'
import Platform from './Platform'
import Player from './Player'
import Star from './Star'

export default function Platformer() {
  return (
    <>
      <Image x={400} y={300} texture="sky" depth={-1} />
      <Player x={100} y={450} />
      <Group name="platforms">
        <Platform x={400} y={568} scale={2} />
        <Platform moving x={400} y={400} />
      </Group>
      <Group name="stars">
        {Array.from({ length: 11 }).map((_, index) => (
          <Star key={index} x={12 + index * 70} y={200} />
        ))}
      </Group>
    </>
  )
}
