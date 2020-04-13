import React, { useRef, useLayoutEffect, useState, HTMLProps } from 'react'

export const CanvasContext = React.createContext<HTMLCanvasElement>(null)

export interface WithCanvas {
  canvas?: HTMLCanvasElement
}

export type CanvasProps = HTMLProps<HTMLCanvasElement>

export default React.forwardRef(function Canvas(
  { children, ...props }: CanvasProps,
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
