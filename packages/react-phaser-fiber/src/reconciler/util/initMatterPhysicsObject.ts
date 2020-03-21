/**
 * Used in Matter element's create method to add itself to the physics engine
 */
export function initMatterPhysicsObject(instance: any, scene: Phaser.Scene) {
  if (!scene.matter) {
    throw Error(
      'Game must have a physics engine configured for Matter components'
    )
  }

  scene.matter.world.add(instance)
}
