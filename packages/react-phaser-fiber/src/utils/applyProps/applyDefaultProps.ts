import sanitizeProps from './sanitizeProps'

export default function applyDefaultProps(
  instance: any,
  oldProps: Record<string, any>,
  newProps: Record<string, any>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, initialX, initialY, ...props } = sanitizeProps(newProps)

  if (data && instance.setData) {
    Object.keys(data).forEach(dataKey => {
      instance.setData(dataKey, data[dataKey])
    })
  }

  Object.keys(props).forEach(key => {
    instance[key] = props[key]
  })
}
