import React from 'react'
import { theme, useConfig, ComponentsProvider } from 'docz'
import { Styled, ThemeProvider } from 'theme-ui'
import { theme as chakraTheme, CSSReset, Text } from '@chakra-ui/core'
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
        <CSSReset />
        <Styled.root>{children}</Styled.root>
      </ComponentsProvider>
    </ThemeProvider>
  )
}

const themeConfig = {
  ...baseTheme,
  ...chakraTheme,
  colors: {
    ...baseTheme.colors,
    ...chakraTheme.colors,
  },
  styles: {
    ...baseTheme.styles,
    root: {
      fontSize: 'base',
    },
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
