export default function pick<T extends {}>(
  object: T,
  keys: string[]
): Partial<T> {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      // @ts-ignore
      obj[key] = object[key]
    }
    return obj
  }, {})
}
