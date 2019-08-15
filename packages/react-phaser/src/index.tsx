export * from './hooks'
import { TYPES } from './utils/element'
import { TextProps } from './components/Text'
import { SpriteProps } from './components/Sprite'
import { ImageProps } from './components/Image'

// components
export { default as Game } from './components/Game'
export { default as Scene } from './components/Scene'

export { createPhaserComponent } from './utils/element'
export { applyDefaultProps } from './utils/props'

export const Text = (TYPES.Text as unknown) as React.FC<TextProps>
export const Sprite = (TYPES.Sprite as unknown) as React.FC<SpriteProps>
export const Image = (TYPES.Image as unknown) as React.FC<ImageProps>
