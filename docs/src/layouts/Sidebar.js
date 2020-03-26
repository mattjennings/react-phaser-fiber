import {
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useColorMode,
} from '@chakra-ui/core'
import humanize from 'humanize-string'
import React, { useMemo, useState } from 'react'
import Link from '../components/Link'
import { useSidebar } from '../components/SidebarProvider'
import { useIsMobile } from '../hooks'
import { motion } from 'framer-motion'

function Sidebar({ docs, path }) {
  const isMobile = useIsMobile()
  const { isSidebarOpen, closeSidebar } = useSidebar()
  const isOpen = isMobile && isSidebarOpen

  const links = useMemo(
    () =>
      getPageTree(
        docs.filter(
          (doc) => doc.context && !!doc.context.frontmatter
        )
      ),
    [docs]
  )

  const content = (
    <Box>
      <SectionLabel>Intro</SectionLabel>
      <Links
        links={links}
        path={path}
        include={['getting-started']}
      />
      <SectionLabel>API</SectionLabel>
      <Links
        links={links}
        path={path}
        include={['game-objects', 'arcade-physics']}
      />
    </Box>
  )

  return isMobile ? (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={closeSidebar}
    >
      <DrawerOverlay />
      <DrawerContent
        backgroundColor="gray.900"
        color="gray.100"
      >
        <DrawerCloseButton marginTop={2} />
        <DrawerHeader>
          <Link to="/" display="inline-block">
            react-phaser-fiber
          </Link>
        </DrawerHeader>
        {content}
      </DrawerContent>
    </Drawer>
  ) : (
    <Box
      as="nav"
      backgroundColor={'gray.900'}
      borderRight="1px solid"
      borderRightColor="gray.700"
      color="gray.100"
      width={250}
      height="100vh"
      overflowY="scroll"
    >
      <DrawerHeader>
        <Link to="/" display="inline-block">
          react-phaser-fiber
        </Link>
      </DrawerHeader>
      {content}
    </Box>
  )
}

function Links({ links, path, include }) {
  const filteredLinks = links.filter((link) =>
    include.includes(link.key)
  )
  return (
    <Box paddingBottom={1}>
      {filteredLinks.map((link, index) => (
        <LinkGroup
          key={index}
          link={link}
          path={path}
          collapsable={link.isRoot}
        />
      ))}
    </Box>
  )
}

function SectionLabel(props) {
  return (
    <Text
      fontSize="xs"
      fontWeight={500}
      color="gray.400"
      paddingLeft={6}
      paddingY={1}
      textTransform="uppercase"
      {...props}
    />
  )
}

function LinkGroup({ link, collapsable, path }) {
  const isActive = isLinkActive(link, path)
  const [collapsed, setCollapsed] = useState(
    collapsable ? !isActive : false
  )

  return (
    <>
      <Button
        display="block"
        variant="unstyled"
        textAlign="start"
        onClick={() => setCollapsed(!collapsed)}
        width="100%"
        paddingTop={2}
        paddingBottom={2}
        overflowX="hidden"
        height="auto"
        borderRadius={0}
        _focus={{
          outline: 'none',
          background: 'rgba(255,255,255,0.1)',
        }}
        _hover={{
          background: 'rgba(255,255,255,0.1)',
        }}
      >
        <Text
          textTransform={'capitalize'}
          fontSize={'md'}
          fontWeight={700}
          color={'gray.200'}
          paddingBottom={1}
          paddingLeft={6}
        >
          {humanize(link.key)}
        </Text>
      </Button>
      <Box paddingLeft={6}>
        <Collapse isOpen={!collapsed}>
          {link.children.length > 0 && (
            <ChildLinks links={link.children} path={path} />
          )}
        </Collapse>
      </Box>
    </>
  )
}

function ChildLinks({ links, path }) {
  return (
    <Box
      as="ul"
      listStyleType="none"
      paddingLeft={2}
      paddingBottom={1}
    >
      {links.map((link, index) => {
        return (
          <React.Fragment key={index}>
            <Text
              as="li"
              textTransform={
                link.path ? 'capitalize' : 'uppercase'
              }
              fontSize={link.path ? 'sm' : 'xs'}
              fontWeight={
                link.path
                  ? isLinkActive(link, path)
                    ? 500
                    : 400
                  : 500
              }
              color={
                link.path
                  ? isLinkActive(link, path)
                    ? 'teal.300'
                    : 'gray.200'
                  : 'gray.400'
              }
              paddingBottom={2}
            >
              {link.path ? (
                <Link
                  display="inline-block"
                  padding="2px"
                  to={link.path}
                  whileHover={{
                    x: 5,
                  }}
                >
                  {link.key}
                </Link>
              ) : (
                link.key
              )}
            </Text>
            {link.children.length > 0 && (
              <ChildLinks
                links={link.children}
                path={path}
              />
            )}
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
        (child) => child.key === pathname
      )

      if (!existing) {
        parent.push({
          key: pathname,
          path:
            index === array.length - 1
              ? doc.path
              : undefined,
          isRoot: Array.isArray(pathObject) && index === 0,
          section: doc.section,
          children: [],
        })
      }

      return parent[parent.length - 1]
    }, total)

    return total
  }, [])
}

function isLinkActive(link, path) {
  return link.path === decodeURIComponent(path)
    ? true
    : !!link.children &&
        link.children.find((child) =>
          isLinkActive(child, path)
        )
}

export default Sidebar
