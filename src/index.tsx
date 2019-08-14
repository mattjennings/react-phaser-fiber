export * from './hooks'
import render from './render'
import { TYPES } from './utils/element'
import { TextProps } from './components/Text'

export { default as Game } from './components/Game'
export { default as Scene } from './components/Scene'
export { render }

export const Text = (TYPES.Text as unknown) as React.FC<TextProps>
