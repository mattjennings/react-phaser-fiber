import { iterateProps } from '../../util/iterateProps'
import { GameObjectProps } from '../types'
import isEqual from 'fast-deep-equal'

export function applyGameObjectProps<T extends Phaser.GameObjects.GameObject>(
  instance: T,
  oldProps: GameObjectProps<Phaser.GameObjects.GameObject>,
  newProps: GameObjectProps<Phaser.GameObjects.GameObject>
) {
  iterateProps(
    getProps(oldProps),
    getProps(newProps),
    (key, newValue, oldValue) => {
      switch (key) {
        case 'data':
          Object.keys(newProps.data).forEach((dataKey) => {
            instance.setData(dataKey, newProps.data[dataKey])
          })
          break
        case 'name':
          instance.setName(newValue as string)
          break
        case 'active':
          instance.setActive(newValue as boolean)
          break
        case 'tabIndex':
          instance.tabIndex = newValue as number
          break
        case 'renderFlags':
          instance.renderFlags = newValue as number
          break
        case 'cameraFilter':
          instance.cameraFilter = newValue as number
          break
        case 'ignoreDestroy':
          instance.ignoreDestroy = newValue as boolean
          break
        case 'interactive':
          const { shape, callback, dropZone } = newValue as GameObjectProps<
            any
          >['interactive']
          if (!isEqual(newValue, oldValue)) {
            instance.setInteractive(shape, callback, dropZone)
          }
          break
      }
    }
  )
}

function getProps(props: GameObjectProps<Phaser.GameObjects.GameObject>) {
  const {
    data,
    name,
    active,
    tabIndex,
    renderFlags,
    cameraFilter,
    ignoreDestroy,
    interactive,
  } = props

  return {
    data,
    name,
    active,
    tabIndex,
    renderFlags,
    cameraFilter,
    ignoreDestroy,
    interactive,
  }
}
