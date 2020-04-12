import {
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  PseudoBox,
  Text,
  Link as ChakraLink,
  useTheme,
} from '@chakra-ui/core'
import { MenuItem, useCurrentDoc, useMenus } from 'docz'
import React, { useState, useLayoutEffect } from 'react'
import HeaderLink from '../components/HeaderLink'
import { useSidebar } from '../components/SidebarProvider'
import { useIsMobile } from '../hooks'
import { debounce, throttle } from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'

const MotionChakraLink = motion.custom(ChakraLink)

function Sidebar() {
  const isMobile = useIsMobile()
  const { isSidebarOpen, closeSidebar } = useSidebar()
  const isOpen = isMobile && isSidebarOpen

  return isMobile ? (
    <Drawer isOpen={isOpen} placement="left" onClose={closeSidebar}>
      <DrawerOverlay />
      <DrawerContent backgroundColor="gray.900" color="gray.100">
        <DrawerCloseButton marginTop={2} />
        <DrawerHeader>
          <HeaderLink to="/" display="inline-block">
            react-phaser-fiber
          </HeaderLink>
        </DrawerHeader>
        <Links />
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
      flexShrink={0}
    >
      <DrawerHeader>
        <HeaderLink to="/" display="inline-block">
          react-phaser-fiber
        </HeaderLink>
      </DrawerHeader>
      <Links />
    </Box>
  )
}

function Links() {
  const menus = useMenus() ?? []

  // console.log(menus)
  return (
    <Box paddingBottom={1}>
      {menus
        .filter((menu) => menu.route !== '/')
        .map((menu) => {
          if (!menu.route) {
            return <MenuGroup key={menu.id} menu={menu} />
          }

          return <MenuLink key={menu.id} item={menu} />
        })}
    </Box>
  )
}

function MenuGroup({ menu }: { menu: MenuItem }) {
  const currentDoc = useCurrentDoc()
  const isActive = currentDoc.menu === menu.name
  const [collapsed, setCollapsed] = useState(
    menu.menu?.length ?? 0 > 0 ? !isActive : false
  )

  return (
    <>
      <Button
        display="block"
        variant="unstyled"
        textAlign="start"
        onClick={() => setCollapsed(!collapsed)}
        width="100%"
        paddingY={2}
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
          paddingLeft={6}
        >
          {menu.name}
        </Text>
      </Button>
      <Collapse isOpen={!collapsed}>
        <Box paddingLeft={8} paddingTop={1}>
          {menu.menu?.map((childMenu) => (
            <MenuLink key={childMenu.id} item={childMenu} />
          ))}
        </Box>
      </Collapse>
    </>
  )
}

function MenuLink({ item }: { item: MenuItem }) {
  const currentDoc = useCurrentDoc()
  const isActive = currentDoc.route === item.route
  const theme = useTheme()

  const [activeHeading, setActiveHeading] = useState(null)

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveHeading(
        currentDoc?.headings.find(
          (heading: any) =>
            heading.slug === window.location.hash?.replace('#', '')
        )
      )
    }
  }, [])

  // check current heading on scroll
  useLayoutEffect(() => {
    const el = document.querySelector('main')

    const onScroll = throttle((ev: any) => {
      if (el && currentDoc.headings) {
        let currentHeading = null
        for (const heading of currentDoc.headings) {
          const headingEl = document.querySelector(`#${heading.slug}`)

          if (
            headingEl &&
            headingEl.getBoundingClientRect().top <= ev.target.scrollTop
          ) {
            currentHeading = heading
          }
        }
        setActiveHeading(currentHeading)
      }
    }, 100)

    if (el) {
      el.addEventListener('scroll', onScroll)

      return () => {
        el.removeEventListener('scroll', onScroll)
      }
    }
  }, [])

  return (
    <Box paddingBottom={2}>
      <PseudoBox
        as={(props) => (
          <HeaderLink {...props} to={item.route} whileHover={{}} />
        )}
        padding="2px"
        marginLeft="-2px"
        display="inline-block"
        fontSize={'md'}
        fontWeight={isActive ? 500 : 400}
        color={isActive ? 'teal.300' : 'gray.200'}
      >
        {item.name}
      </PseudoBox>
      {/* headings */}
      {isActive && currentDoc.headings.length > 0 && (
        <Box paddingLeft={4}>
          {currentDoc.headings.map((heading: any) => {
            const isHeadingActive = activeHeading === heading

            return (
              <Box key={heading.slug} display="flex" alignItems="center">
                {/* active heading indicator */}
                <motion.div
                  initial={isHeadingActive ? { width: 2 } : { width: 0 }}
                  animate={isHeadingActive ? { width: 2 } : { width: 0 }}
                  style={{
                    height: '0.8em',
                    marginRight: 4,
                    background: theme.colors.teal[300],
                  }}
                />
                <MotionChakraLink
                  href={`#${heading.slug}`}
                  layoutTransition
                  padding="2px"
                  marginLeft="-2px"
                  fontSize="sm"
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  {heading.value}
                </MotionChakraLink>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default Sidebar
