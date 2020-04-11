//@ts-ignore
import baseTheme from 'gatsby-theme-docz/src/theme'
import React from 'react'
import {
  ThemeProvider as ChakraThemeProvider,
  CSSReset,
  theme as chakraTheme,
} from '@chakra-ui/core'
import ColorModeProvider from './ColorModeProvider'

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
  styles: {
    ...baseTheme.styles,
    root: {},
    h1: {
      ...baseTheme.styles.h1,
      fontSize: '2xl',
      fontFamily: 'heading',
      marginBottom: 1,
    },
    h2: {
      ...baseTheme.styles.h2,
      fontSize: 'xl',
      fontFamily: 'heading',
      marginBottom: 1,
    },
    h3: {
      ...baseTheme.styles.h3,
      fontSize: 'lg',
      fontFamily: 'heading',
      marginBottom: 1,
    },
    h4: {
      ...baseTheme.styles.h4,
      fontSize: 'md',
      marginBottom: 1,
    },
    h5: {
      ...baseTheme.styles.h5,
      fontSize: 'base',
      marginBottom: 1,
    },
    h6: {
      ...baseTheme.styles.h6,
      fontSize: 'base',
      marginBottom: 1,
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
        <CSSReset />
        {children}
      </ColorModeProvider>
    </ChakraThemeProvider>
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
