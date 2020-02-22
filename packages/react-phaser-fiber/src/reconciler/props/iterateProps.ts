import { sanitizeProps } from '../sanitizeProps'

export function iterateProps<T extends {}, K extends keyof T>(
  oldProps: T,
  newProps: T,
  callback: (key: K, newValue: T[K], oldValue: T[K]) => any
): void {
  const keys = sanitizeProps(newProps) as Array<K>

  keys.forEach(key => {
    if (
      typeof newProps[key] !== 'undefined' &&
      oldProps[key] !== newProps[key]
    ) {
      callback(key, newProps[key], oldProps[key])
    }
  })
}
