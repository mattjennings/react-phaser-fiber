export default function isRefObject<T>(
  ref: React.Ref<T>
): ref is React.RefObject<T> {
  return !!(ref as React.RefObject<T>).current
}
