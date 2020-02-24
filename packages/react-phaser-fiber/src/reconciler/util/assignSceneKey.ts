/**
 * Assigns the scene key to the instance so the hostconfig knows which scene to add to
 */
export function assignSceneKey(instance: any, scene: Phaser.Scene) {
  instance.__reactPhaser = {
    sceneKey: scene.scene.key,
  }
}
