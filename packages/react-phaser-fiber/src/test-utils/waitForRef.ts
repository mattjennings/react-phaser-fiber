import { wait } from '@testing-library/react'

export async function waitForRef(ref: any) {
  await wait(() => {
    if (!ref.current) {
      throw 'Ref was not set'
    }
  })
}
