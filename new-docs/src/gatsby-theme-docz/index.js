import React from 'react'
import { theme, useConfig, ComponentsProvider } from 'docz'
import { Styled, ThemeProvider, useColorMode } from 'theme-ui'
import {
  theme as chakraTheme,
  CSSReset,
  Text,
  ColorModeProvider,
  ThemeProvider as ChakraThemeProvider,
} from '@chakra-ui/core'
import baseComponents from 'gatsby-theme-docz/src/components'
import baseTheme from 'gatsby-theme-docz/src/theme'
import Page from '../ui/Page'

const components = {
  ...baseComponents,
  layout: Page,
}

const Theme = ({ children }) => {
  const config = useConfig()
  return (
    <ThemeProvider theme={config.themeConfig} components={components}>
      <ComponentsProvider components={components}>
        <Content>{children}</Content>
      </ComponentsProvider>
    </ThemeProvider>
  )
}

function Content({ children }) {
  const [colorMode] = useColorMode('dark')
  const value = colorMode === 'default' ? 'dark' : colorMode

  return (
    // ColorModeProvider doesn't re-render when value changes, so a temp fix is to use the key prop as well
    // (but not ideal because it does remount everything)
    <ColorModeProvider key={value} value={value}>
      <CSSReset />
      {children}
    </ColorModeProvider>
  )
}

const themeConfig = {
  ...baseTheme,
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    playground: baseTheme.colors.playground,
    prism: baseTheme.colors.prism,
  },
  styles: {
    ...baseTheme.styles,
    root: {},
    h1: {
      ...baseTheme.styles.h1,
      fontSize: '2xl',
      marginBottom: 1,
    },
    h2: {
      ...baseTheme.styles.h2,
      fontSize: 'xl',
      marginBottom: 1,
    },
    h3: {
      ...baseTheme.styles.h3,
      fontSize: 'lg',
      marginBottom: 1,
    },
    h4: {
      ...baseTheme.styles.h4,
      fontSize: 'md',
      marginBottom: 1,
    },
    h4: {
      ...baseTheme.styles.h5,
      fontSize: 'base',
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

// console.log('theme', themeConfig)
export default theme(themeConfig)(Theme)
