import { TYPES } from '../utils/element'
import { GameObjectProps } from './GameObject'

export const GameObject = (TYPES.GameObject as unknown) as React.FC<
  GameObjectProps<Phaser.GameObjects.GameObject>
>

export * from './GameObject'
