//@ts-ignore
import baseTheme from 'gatsby-theme-docz/src/theme'
import React from 'react'
import {
  ThemeProvider as ChakraThemeProvider,
  CSSReset,
  theme as chakraTheme,
  useColorMode,
} from '@chakra-ui/core'
import ColorModeProvider from './ColorModeProvider'
import { Global, css } from '@emotion/core'

const theme = {
  ...chakraTheme,
  fonts: {
    body: '"Helvetica Neue", Arial, Helvetica, sans-serif',
    heading: '"Helvetica Neue", Arial, Helvetica, sans-serif',
    mono: '"Fira Mono", Menlo, monospace',
  },
  prism: {
    dark: {
      ...baseTheme.prism.dark,
      plain: {
        ...baseTheme.prism.dark.plain,
        fontFamily: '"Fira Mono", Menlo, monospace',
      },
    },
    light: {
      ...baseTheme.prism.light,
      plain: {
        ...baseTheme.prism.light.plain,
        fontFamily: '"Fira Mono", Menlo, monospace',
      },
    },
  },
}

// console.log(theme)

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider>
        <GlobalStyles />
        {children}
      </ColorModeProvider>
    </ChakraThemeProvider>
  )
}

function GlobalStyles() {
  const { colorMode } = useColorMode()

  return (
    <>
      <CSSReset />
      <Global
        styles={{
          code: {
            backgroundColor:
              colorMode === 'dark'
                ? theme.colors.gray[700]
                : theme.colors.gray[200],
            padding: 4,
            marginLeft: 2,
            marginRight: 2,
            borderRadius: 5,
            fontSize: '0.9em',
          },
        }}
      />
    </>
  )
}
declare module '@chakra-ui/core/dist/theme' {
  export interface DefaultTheme {
    prism: {
      dark: any
      light: any
    }
  }
}
