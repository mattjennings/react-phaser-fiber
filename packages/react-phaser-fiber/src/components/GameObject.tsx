import { TYPES } from '../reconciler/element'
import { GameObjectProps } from '../reconciler/elements/GameObject'
import React from 'react'

const GameObjectElement = (TYPES.GameObject as unknown) as React.FC<
  GameObjectProps<Phaser.GameObjects.GameObject>
>

export * from '../reconciler/elements/GameObject'

export const GameObjectContext = React.createContext<
  Phaser.GameObjects.GameObject
>(null)

export default function GameObject<T extends Phaser.GameObjects.GameObject>(
  props: GameObjectProps<T>
) {
  return (
    <GameObjectContext.Provider value={props.instance}>
      {props.children}
      <GameObjectElement {...props} />
    </GameObjectContext.Provider>
  )
}
