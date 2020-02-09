import sanitizeProps from './sanitizeProps'

export default function applyProps(
  instance: any,
  oldProps: Record<string, any>,
  newProps: Record<string, any>
) {
  Object.keys(sanitizeProps(newProps)).forEach(key => {
    if (
      typeof newProps[key] !== 'undefined' &&
      oldProps[key] !== newProps[key]
    ) {
      switch (key) {
        case 'data':
          Object.keys(newProps.data).forEach(dataKey => {
            instance.setData(dataKey, newProps.data[dataKey])
          })
          break

        /** Point values */
        case 'acceleration':
        case 'bounce':
        case 'drag':
        case 'friction':
        case 'gravity':
        case 'velocity':
        case 'maxVelocity':
          const oldValue = convertToPoint(oldProps[key])
          const newValue = convertToPoint(newProps[key])
          if (!pointsAreEqual(oldValue, newValue)) {
            // console.log(oldProps[key], newProps[key])
            setProp(instance, key, newValue.x, newValue.y)
          }
          break

        /** Physics */
        case 'debug':
          if (
            oldProps.debugShowBody !== newProps.debugShowBody ||
            oldProps.debugShowVelocity !== newProps.debugShowVelocity ||
            oldProps.debugBodyColor !== newProps.debugBodyColor
          ) {
            instance.setDebug(
              newProps.debugShowBody,
              newProps.debugShowVelocity,
              newProps.debugBodyColor
            )
          }
          break
        case 'disableBody':
        case 'hideBody':
          if (
            oldProps.disableBody !== newProps.disableBody ||
            oldProps.hideBody !== newProps.hideBody
          ) {
            instance.disableBody(newProps.disableBody, newProps.hideBody)
          }
          break
        case 'circle':
          if (newProps.circle) {
            if (
              !oldProps.circle ||
              oldProps.circle.radius !== newProps.circle.radius ||
              oldProps.circle.offsetX !== newProps.circle.offsetX ||
              oldProps.circle.offsetY !== newProps.circle.offsetY
            ) {
              instance.setCircle(
                newProps.circle.radius,
                newProps.circle.offsetX,
                newProps.circle.offsetY
              )
            }
          }
          break
        case 'offset':
          if (
            !oldProps.offset ||
            oldProps.offset.x !== newProps.offset.x ||
            oldProps.offset.y !== newProps.offset.y
          ) {
            instance.setOffset(newProps.offset.x, newProps.offset.y)
          }
          break
        case 'size':
          if (newProps.size) {
            if (
              !oldProps.size ||
              oldProps.size.width !== newProps.size.width ||
              oldProps.size.height !== newProps.size.height ||
              oldProps.size.center !== newProps.size.center
            ) {
              instance.setSize(
                newProps.size.width,
                newProps.size.height,

                // @ts-ignore - a 3rd argument supposedly exists https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Components.Size.html#setSize__anchor
                newProps.size.center
              )
            }
          }
          break
        default:
          setProp(instance, key, newProps[key])
      }
    }
  })
}

function setProp(instance: any, key: string, ...value: any) {
  // get method name for property. ex: 'setStyle' for 'style'
  const methodName = `set${key.slice(0, 1).toUpperCase() + key.slice(1)}`

  if (instance[methodName]) {
    instance[methodName](...value)
  } else {
    instance[key] = value
  }
}

function convertToPoint(num: number | { x: number; y: number }) {
  if (typeof num === 'number') {
    return { x: num, y: num }
  }

  if (!num) {
    return { x: 0, y: 0 }
  }

  return num
}

function pointsAreEqual(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return p1.x === p2.x && p1.y === p2.y
}
