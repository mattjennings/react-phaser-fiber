import { ComponentsProvider, theme } from 'docz'
import baseComponents from 'gatsby-theme-docz/src/components'
import React from 'react'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'
import ThemeProvider from '../components/ThemeProvider'
import Page from '../ui/Page'
import { Box, PseudoBox, useTheme } from '@chakra-ui/core'

const components = {
  ...baseComponents,
  layout: Page,
  p: (props) => <Box as="p" marginY={2} {...props}></Box>,
  a: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme()
    return (
      <PseudoBox
        as="a"
        color="teal.400"
        _hover={{
          color: theme.colors.teal[300],
        }}
        {...props}
      />
    )
  },
  ul: (props) => <Box as="ul" marginLeft={8} {...props} />,
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
