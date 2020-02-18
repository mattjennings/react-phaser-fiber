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
      const newValue: any = newProps[key]
      const oldValue: any = oldProps[key]

      switch (key) {
        case 'data':
          Object.keys(newProps.data).forEach(dataKey => {
            instance.setData(dataKey, newProps.data[dataKey])
          })
          break

        /** Point values **/
        case 'acceleration':
        case 'bounce':
        case 'drag':
        case 'friction':
        case 'gravity':
        case 'velocity':
        case 'maxVelocity': {
          const oldPoint = convertToPoint(oldProps[key])
          const newPoint = convertToPoint(newProps[key])
          if (!pointsAreEqual(oldPoint, newPoint)) {
            setProp(instance, key, newPoint.x, newPoint.y)
          }
          break
        }

        /** Animation **/
        case 'accumulator':
        case 'delay':
        case 'duration':
        case 'forward':
        case 'frameRate':
        case 'isPlaying':
        case 'msPerFrame':
        case 'skipMissedFrames':
        case 'progress':
        case 'stopOnFrame':
        case 'stopAfterDelay':
        case 'repeat':
        case 'repeatDelay':
        case 'timeScale':
        case 'yoyo':
          setProp(instance.anims, key, newValue)
          break
        /** Physics **/
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
        case 'onWorldBounds':
          setProp(instance.body, key, newValue)
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
                newProps.size.center
              )
            }
          }
          break
        case 'allowGravity':
        case 'allowDrag':
        case 'allowAcceleration':
          setProp(instance.body, key, newValue)
          break
        case 'scale':
          if (typeof newValue === 'number') {
            instance.setScale(newValue)
          } else {
            instance.setScale(
              newValue.x,
              newValue.y,
              newValue.point ? [newValue.point.x, newValue.point.y] : undefined
            )
          }

          // if static, refresh body. there are probably other keys that need this
          if (instance.body?.physicsType === 1) {
            instance.body.updateFromGameObject()
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
    if (typeof instance[key] === 'function') {
      instance[key](...value)
    } else {
      // ...value will always be an array, so we'll get the [0] value
      instance[key] = value[0]
    }
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
