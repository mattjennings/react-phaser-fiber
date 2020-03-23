import { Box } from '@chakra-ui/core'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import MDXProvider from '../../components/GameMDXProvider'
import { SidebarProvider } from '../../components/SidebarProvider'
import Base from '../Base'
import Sidebar from './Sidebar'

const Main = styled.main`
  height: 100vh;
  flex-grow: 1;
  overflow: scroll;
`

/**
 * Used by wrapPageElement in gatsby-browser for doc pages
 */
const DocsPageWrapper = ({ children, path }) => {
  const data = useStaticQuery(graphql`
    query DocsPageWrapperQuery {
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
    <Base>
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
    </Base>
  )
}

export default DocsPageWrapper
