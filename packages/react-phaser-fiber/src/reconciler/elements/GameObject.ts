import { applyGameObjectProps } from '../props/gameobjects'
import { CreatePhaserComponentConfig } from '../element'

export interface GameObjectProps<T extends Phaser.GameObjects.GameObject> {
  instance: T
  ref?: React.Ref<T>
  name?: string
  active?: boolean
  tabIndex?: boolean
  data?: any
  renderFlags?: integer
  cameraFilter?: number
  ignoreDestroy?: boolean
  input?: Phaser.Types.Input.InteractiveObject
  children?: React.ReactNode

  /**
   * Creates the body in the phaser for the specified physics world
   *
   * note: only 'arcade' is supported for now
   */
  physics?: 'arcade'
  physicsType?: 'static' | 'dynamic'
}

const GameObject: CreatePhaserComponentConfig<
  Phaser.GameObjects.GameObject,
  GameObjectProps<Phaser.GameObjects.GameObject> & { scene: Phaser.Scene }
> = {
  create: ({ instance, scene, physics, physicsType }) => {
    // if this is a physics object we need to add the body before applyProps
    if (physics === 'arcade' && scene) {
      if (!scene.physics) {
        throw Error('No physics engine found in Game')
      }
      scene.physics.world.enable(
        instance,
        physicsType === 'static'
          ? Phaser.Physics.Arcade.STATIC_BODY
          : Phaser.Physics.Arcade.DYNAMIC_BODY
      )
    }
    return instance
  },
  applyProps: applyGameObjectProps,
}

export default GameObject
