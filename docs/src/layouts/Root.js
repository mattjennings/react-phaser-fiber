import { Box, Text, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import MDXProvider from '../components/MDXProvider'
import { SidebarProvider } from '../components/SidebarProvider'
import Sidebar from './Sidebar'

/**
 * Used by wrapPageElement in gatsby-browser for doc pages
 */
const Root = ({ children, path }) => {
  const { colorMode } = useColorMode()

  const data = useStaticQuery(graphql`
    query RootQuery {
      allSitePage(sort: { order: ASC, fields: path }) {
        nodes {
          path
          context {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  return (
    <MDXProvider>
      <SidebarProvider>
        <Box display="flex">
          <Sidebar
            docs={data.allSitePage.nodes}
            path={path}
          />
          <Box
            as="main"
            height="100vh"
            flexGrow={1}
            overflow="scroll"
            paddingX={[0, 0, 2]}
            bg={
              colorMode === 'dark' ? 'gray.900' : 'gray.50'
            }
          >
            {children}
          </Box>
        </Box>
      </SidebarProvider>
    </MDXProvider>
  )
}

export default Root
