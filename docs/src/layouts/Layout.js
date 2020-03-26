import React from 'react'
import Header from '../components/Header'
import { Box, useColorMode } from '@chakra-ui/core'
import Helmet from 'react-helmet'

const Layout = ({ children, ...props }) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
      height="100%"
    >
      <Helmet>
        <title>
          {props.pageContext.frontmatter.title
            ? `${props.pageContext.frontmatter.title} | `
            : ''}
          react-phaser-fiber
        </title>
      </Helmet>

      <Header title={props.pageContext.frontmatter.title} />

      <Box paddingX={4}>{children}</Box>
    </Box>
  )
}

export default Layout
