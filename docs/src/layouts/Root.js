import { Box, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import MDXProvider from '../components/MDXProvider'
import { SidebarProvider } from '../components/SidebarProvider'
import Sidebar from './Sidebar'

const Main = styled.main`
  height: 100vh;
  flex-grow: 1;
  overflow: scroll;
`

/**
 * Used by wrapPageElement in gatsby-browser for doc pages
 */
const Root = ({ children, path }) => {
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
          <Main>{children}</Main>
        </Box>
      </SidebarProvider>
    </MDXProvider>
  )
}

export default Root
