import sanitizeProps from './sanitizeProps'

export default function applyProps(
  instance: any,
  oldProps: Record<string, any>,
  newProps: Record<string, any>
) {
  const props = sanitizeProps(newProps)

  Object.keys(props).forEach(key => {
    if (typeof props[key] !== 'undefined' && props[key] !== oldProps[key]) {
      switch (key) {
        case 'data':
          Object.keys(props.data).forEach(dataKey => {
            instance.setData(dataKey, props.data[dataKey])
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
          const oldValue = convertToPoint(props[key])
          const newValue = convertToPoint(newProps[key])

          if (!pointsAreEqual(oldValue, newValue)) {
            setProp(instance, key, props[key])
          }
          break

        /** Physics */
        case 'debug':
          if (
            props.debugShowBody !== newProps.debugShowBody ||
            props.debugShowVelocity !== newProps.debugShowVelocity ||
            props.debugBodyColor !== newProps.debugBodyColor
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
            props.disableBody !== newProps.disableBody ||
            props.hideBody !== newProps.hideBody
          ) {
            instance.disableBody(newProps.disableBody, newProps.hideBody)
          }
          break
        case 'circle':
          if (newProps.circle) {
            if (
              !props.circle ||
              (props.circle.radius !== newProps.circle.radius ||
                props.circle.offsetX !== newProps.circle.offsetX ||
                props.circle.offsetY !== newProps.circle.offsetY)
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
            !props.offset ||
            (props.offset.x !== newProps.offset.x ||
              props.offset.y !== newProps.offset.y)
          ) {
            instance.setOffset(newProps.offset.x, newProps.offset.y)
          }
          break
        case 'size':
          if (newProps.size) {
            if (
              !props.size ||
              (props.size.width !== newProps.size.width ||
                props.size.height !== newProps.size.height ||
                props.size.center !== newProps.size.center)
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
          setProp(instance, key, props[key])
      }
    }
  })
}

function setProp(instance: any, key: string, value: any) {
  // get method name for property. ex: 'setStyle' for 'style'
  const methodName = `set${key.slice(0, 1).toUpperCase() + key.slice(1)}`

  if (instance[methodName]) {
    instance[methodName](value)
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
