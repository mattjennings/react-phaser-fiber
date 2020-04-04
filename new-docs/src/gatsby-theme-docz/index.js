import React from 'react'
import { theme, useConfig, ComponentsProvider } from 'docz'
import { Styled, ThemeProvider } from 'theme-ui'
import baseComponents from 'gatsby-theme-docz/src/components'
import baseTheme from 'gatsby-theme-docz/src/theme'

const componentsMap = {
  ...baseComponents,
}

const Theme = ({ children }) => {
  const config = useConfig()
  return (
    <ThemeProvider theme={config.themeConfig} components={baseComponents}>
      <ComponentsProvider components={baseComponents}>
        <Styled.root>{children}</Styled.root>
      </ComponentsProvider>
    </ThemeProvider>
  )
}

export default theme(baseTheme)(Theme)
