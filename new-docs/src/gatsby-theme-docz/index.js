import { ComponentsProvider, theme } from 'docz'
import baseComponents from 'gatsby-theme-docz/src/components'
import React from 'react'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'
import ThemeProvider from '../components/ThemeProvider'
import Page from '../ui/Page'

const components = {
  ...baseComponents,
  layout: Page,
}

const Root = ({ children }) => {
  return (
    <ThemeUIProvider components={components}>
      <ComponentsProvider components={components}>
        <ThemeProvider>{children}</ThemeProvider>
      </ComponentsProvider>
    </ThemeUIProvider>
  )
}

export default theme()(Root)
