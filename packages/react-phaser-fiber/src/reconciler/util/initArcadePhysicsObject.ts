/**
 * Used in Arcade element's create method to add itself to the physics engine
 */
export function initArcadePhysicsObject(
  instance: any,
  scene: Phaser.Scene,
  physicsType: 'static' | 'dynamic' = 'dynamic'
) {
  if (!scene.physics) {
    throw Error(
      'Game must have a physics engine configured for Arcade components'
    )
  }

  scene.physics.world.enable(
    instance,
    physicsType === 'static'
      ? Phaser.Physics.Arcade.STATIC_BODY
      : Phaser.Physics.Arcade.DYNAMIC_BODY
  )
}
