import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/core'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import MDXProvider from '../components/GameMDXProvider'
import Header from '../components/Header'
import { useIsMobile } from '../hooks'
import Base from './Base'
import Link from '../components/Link'

const Content = styled.div`
  display: flex;
`

const Main = styled.main`
  height: 100vh;
  flex-grow: 1;
  overflow: scroll;

  .content {
    padding: 8px;
  }
`

const DocsLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(false)

  const data = useStaticQuery(graphql`
    query DocsLayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
      mdx {
        frontmatter {
          title
        }
      }
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
        <Content>
          <Sidebar
            open={isOpen}
            onClose={onClose}
            docs={data.allSitePage.nodes}
          />
          <Main>
            <Header
              title={data.mdx.frontmatter.title}
              onSidebarOpen={onOpen}
            />
            <div className="content">{children}</div>
          </Main>
        </Content>
      </MDXProvider>
    </Base>
  )
}

function Sidebar({ open, onClose, docs }) {
  const isMobile = useIsMobile()
  const isOpen = isMobile && open

  const links = useMemo(
    () =>
      getPageTree(
        docs.filter(doc => !!doc.context.frontmatter)
      ),
    [docs]
  )
  // console.log(links)

  const content = (
    <Box
      css={theme => css`
        & > ul > li {
          padding-left: ${theme.space[6]};
        }
      `}
    >
      <Links links={links} />
    </Box>
  )

  return isMobile ? (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent
        css={theme => css`
          background: ${theme.colors.gray[900]};
          color: ${theme.colors.gray[100]};
        `}
      >
        <DrawerCloseButton
          css={css`
            margin-top: 8px;
          `}
        />
        <DrawerHeader>react-phaser-fiber</DrawerHeader>
        <Divider borderColor="gray.400" />
        {content}
      </DrawerContent>
    </Drawer>
  ) : (
    <nav
      css={theme => css`
        background: ${theme.colors.gray[900]};
        border-right: 1px solid ${theme.colors.gray[200]};
        color: ${theme.colors.gray[100]};
        width: 250px;
        height: 100vh;
      `}
    >
      <DrawerHeader>react-phaser-fiber</DrawerHeader>
      <SidebarDivider />
      {content}
    </nav>
  )
}

function Links({ links }) {
  return (
    <Box as="ul" listStyleType="none">
      {links.map((link, index) => {
        return (
          <React.Fragment key={index}>
            <Box as="li" paddingLeft={1}>
              <Text
                textTransform={
                  link.isRoot || link.path
                    ? 'capitalize'
                    : 'uppercase'
                }
                fontSize={
                  link.isRoot
                    ? 'md'
                    : link.path
                    ? 'sm'
                    : 'xs'
                }
                fontWeight={
                  link.isRoot ? 700 : link.path ? 400 : 500
                }
                color={
                  link.isRoot
                    ? 'gray.200'
                    : link.path
                    ? 'gray.200'
                    : 'gray.400'
                }
                paddingBottom={1}
              >
                {link.path ? (
                  <Link to={link.path}>{link.key}</Link>
                ) : (
                  link.key
                )}
              </Text>
              {link.children.length > 0 && (
                <Links links={link.children} />
              )}
            </Box>
            {link.isRoot && <SidebarDivider />}
          </React.Fragment>
        )
      })}
    </Box>
  )
}

/**
 * Groups docs into a directory tree
 */
function getPageTree(docs) {
  return docs.reduce((total, doc) => {
    const paths = doc.path.split('/').filter(Boolean)

    paths.reduce((pathObject, pathname, index, array) => {
      const parent = Array.isArray(pathObject)
        ? pathObject
        : pathObject.children

      const existing = parent.find(
        child => child.key === pathname
      )

      if (!existing) {
        parent.push({
          key: pathname,
          path:
            index === array.length - 1
              ? doc.path
              : undefined,
          isRoot: Array.isArray(pathObject) && index === 0,
          children: [],
        })
      }

      return parent[parent.length - 1]
    }, total)

    return total
  }, [])
}

const SidebarDivider = props => (
  <Divider borderColor="gray.600" {...props} />
)
export default DocsLayout
