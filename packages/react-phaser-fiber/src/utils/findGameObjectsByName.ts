import { Scene } from 'phaser'

export function findGameObjectsByName(scene: Scene, name: string) {
  return scene.children.list.filter(child => child.name === name)
}
