import { TYPES } from '../reconciler/element'
import { GameObjectProps } from '../reconciler/elements/GameObject'

const GameObject = (TYPES.GameObject as unknown) as React.FC<
  GameObjectProps<Phaser.GameObjects.GameObject>
>

export * from '../reconciler/elements/GameObject'
export default GameObject
