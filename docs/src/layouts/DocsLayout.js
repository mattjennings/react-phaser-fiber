import React from 'react'
import Header from '../components/Header'
import { Box, useColorMode } from '@chakra-ui/core'

const DocsLayout = ({ children, ...props }) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
      height="100%"
    >
      <Header title={props.pageContext.frontmatter.title} />
      <Box paddingX={4}>{children}</Box>
    </Box>
  )
}

export default DocsLayout
