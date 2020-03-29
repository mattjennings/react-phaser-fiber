import {
  CSSReset,
  theme,
  ThemeProvider,
} from '@chakra-ui/core'
import React from 'react'
import ColorModeProvider from './src/components/ColorModeProvider'
import Root from './src/layouts/Root'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        {element}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Root {...props}>{element}</Root>
}
