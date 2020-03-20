/**
 * Used in Matter element's create method to add itself to the physics engine
 */
export function initMatterPhysicsObject(
  instance: any,
  scene: Phaser.Scene,
  physicsType: 'static' | 'dynamic' = 'dynamic'
) {
  if (!scene.matter) {
    throw Error(
      'Game must have a physics engine configured for Matter components'
    )
    // Should we setBody here to avoid reset of parameters.
  }

  scene.matter.world.add(instance)
}
