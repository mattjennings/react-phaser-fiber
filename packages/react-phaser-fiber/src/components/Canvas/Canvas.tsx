import React, { useRef, useLayoutEffect, useState } from 'react'

export const CanvasContext = React.createContext<HTMLCanvasElement>(null)

export interface WithCanvas {
  canvas?: HTMLCanvasElement
}

export function withCanvas<T extends WithCanvas>(
  Component: React.ComponentType<T>
) {
  function WithCanvas(props: T) {
    return (
      <CanvasContext.Consumer>
        {canvas => <Component {...props} canvas={canvas} />}
      </CanvasContext.Consumer>
    )
  }

  return WithCanvas as React.ComponentType<Omit<T, keyof WithCanvas>>
}

export default React.forwardRef(function Canvas(
  { children, ...props }: JSX.IntrinsicElements['canvas'],
  ref: React.RefObject<HTMLCanvasElement>
) {
  const innerRef = useRef(null)
  const [rendered, setRendered] = useState(false)
  useLayoutEffect(() => setRendered(true), [])

  return (
    <CanvasContext.Provider value={(innerRef || ref).current}>
      <canvas {...props} ref={innerRef || ref}>
        {rendered ? children : null}
      </canvas>
    </CanvasContext.Provider>
  )
})
