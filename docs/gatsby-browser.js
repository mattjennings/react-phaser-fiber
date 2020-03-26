import {
  CSSReset,
  theme,
  ThemeProvider,
} from '@chakra-ui/core'
import React from 'react'
import Root from './src/layouts/Root'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CSSReset theme={theme} />
    {element}
  </ThemeProvider>
)

export const wrapPageElement = ({ element, props }) => {
  return <Root {...props}>{element}</Root>
}
