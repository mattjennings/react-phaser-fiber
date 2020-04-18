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
  BoxProps,
} from '@chakra-ui/core'
import { MenuItem, useCurrentDoc, useMenus } from 'docz'
import React, { useState, useLayoutEffect } from 'react'
import HeaderLink from '../components/HeaderLink'
import { useSidebar } from '../components/SidebarProvider'
import { useIsMobile } from '../hooks'
import { debounce, throttle, uniq } from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

  const withSubmenus = getMenus(menus.filter((menu) => menu.route !== '/'))

  return (
    <Box paddingBottom={1}>
      {withSubmenus.map((menu) => {
        const isRootMenu = !menu.route
        const isLink = !!menu.route

        if (isRootMenu) {
          return <MenuGroup key={menu.id} menu={menu} />
        }

        if (isLink) {
          return <MenuLink key={menu.id} item={menu} />
        }

        return null
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
        <ChildLinks item={menu} />
      </Collapse>
    </>
  )
}

function ChildLinks({ item, ...props }: { item: MenuItem } & BoxProps) {
  return (
    <Box paddingLeft={8} {...props}>
      {item.menu?.map((childMenu) => {
        if (childMenu.route) {
          return <MenuLink key={childMenu.id} item={childMenu} />
        }

        return (
          <>
            <Text
              color="gray.500"
              paddingBottom={1}
              fontWeight="normal"
              textTransform="uppercase"
              fontSize="sm"
            >
              {childMenu.name}
            </Text>
            <ChildLinks item={childMenu} paddingLeft={2} />
          </>
        )
      })}
    </Box>
  )
}

function MenuLink({ item }: { item: MenuItem }) {
  const currentDoc = useCurrentDoc()
  const isActive = currentDoc.route === item.route
  const theme = useTheme()

  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveHeading(window.location.hash?.replace('#', ''))
    }
  }, [])

  // highlight active heading that is visible on page
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const mainEl = document.querySelector('main')

      function callback(entries: IntersectionObserverEntry[]) {
        let heading = null
        for (const entry of entries) {
          const isAbove =
            entry.boundingClientRect.y < (entry.rootBounds?.y ?? 0)
          // if the heading was scrolled past, then it is the active one
          if (mainEl && isAbove) {
            heading = entry.target.id
          }
        }
        setActiveHeading(heading)
      }

      const observer = new IntersectionObserver(callback, {
        root: mainEl,
        threshold: 0.75,
      })

      // observe each heading element
      for (const heading of currentDoc.headings) {
        const headingEl = document.querySelector(`#${heading.slug}`)
        if (headingEl) {
          observer.observe(headingEl)
        }
      }

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <Box paddingBottom={1}>
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
        <Box paddingLeft={2}>
          {currentDoc.headings.map((heading: any) => {
            const isHeadingActive = activeHeading === heading.slug

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
                  // color={isHeadingActive ? 'inherit' : 'gray.500'}
                  _hover={{
                    textDecoration: 'none',
                    // color: 'inherit',
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

const getMenus = (menus: MenuItem[]): MenuItem[] => {
  return menus.reduce((total: MenuItem[], menu) => {
    // is a menu at the highest level
    const isRootMenu = !menu.route && menu.menu?.length

    if (isRootMenu) {
      // get child menu with parent properties
      const subMenus = menu.menu?.filter((subMenu) => !!subMenu.parent) ?? []

      // get all sub menu names
      const subMenuParents = uniq(
        subMenus.map((subMenu) => subMenu.parent) ?? []
      )

      // normal links under root menu
      const linkMenus =
        menu.menu?.filter((subMenu) => !subMenu.parent && subMenu.route) ?? []

      return [
        ...total,
        {
          ...menu,
          menu: [
            ...linkMenus,

            // get all the sub menus for the sub menu parent
            ...subMenuParents.map((name) => {
              return {
                ...(menu.menu?.find((m) => m.name === name) as MenuItem),
                parent: menu.name,
                menu: subMenus.filter((m) => m.parent === name),
              }
            }),
          ],
        },
      ]
    }

    return [...total, menu]
  }, [])
}

export default Sidebar
