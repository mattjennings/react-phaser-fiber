export function toArray<T>(obj: T): T[] {
  return Array.isArray(obj) ? obj : [obj]
}
