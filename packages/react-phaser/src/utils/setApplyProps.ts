export type ApplyProps<T, P> = (instance: T, oldProps: P, newProps: P) => any

/**
 * A typescript helper to set an object of any type's `applyProps` for the reconciler
 * @param obj
 * @param applyProps
 */
export default function setApplyProps<T, Props>(
  obj: T,
  applyProps: ApplyProps<T, Props>
) {
  // @ts-ignore
  obj.applyProps = applyProps

  return obj as T & { applyProps: ApplyProps<Props, T> }
}
