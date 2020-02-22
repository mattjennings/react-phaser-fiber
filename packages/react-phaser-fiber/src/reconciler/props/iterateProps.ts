import { sanitizeProps } from '../sanitizeProps'

/**
 * A helper function for iterating over props that should be applied
 */
export function iterateProps<T, K extends keyof T>(
  oldProps: T,
  newProps: T,
  callback: (key: K, newValue: T[K], oldValue: T[K]) => void
): void {
  const keys = Object.keys(sanitizeProps(newProps)) as Array<K>

  keys.forEach(key => {
    if (
      typeof newProps[key] !== 'undefined' &&
      oldProps[key] !== newProps[key]
    ) {
      callback(key, newProps[key], oldProps[key])
    }
  })
}
