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
  useTheme,
  jsx,
  css,
  PseudoBox,
} from '@chakra-ui/core'
import humanize from 'humanize-string'
import React, { useMemo, useState } from 'react'
import Link from '../components/Link'
import { useSidebar } from '../components/SidebarProvider'
import { useIsMobile } from '../hooks'
import { motion } from 'framer-motion'
import { useMenus, useCurrentDoc, MenuItem, useDocs } from 'docz'

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
          <Link to="/" display="inline-block">
            react-phaser-fiber
          </Link>
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
        <Link to="/" display="inline-block">
          react-phaser-fiber
        </Link>
      </DrawerHeader>
      <Links />
    </Box>
  )
}

function Links() {
  const menus = useMenus()

  return (
    <Box paddingBottom={1}>
      {menus
        .filter((menu) => menu.route !== '/')
        .map((menu, index) => {
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
    menu.menu?.length > 0 ? !isActive : false
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
        marginY={2}
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
        <Box paddingLeft={8}>
          {menu.menu.map((childMenu) => (
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

  return (
    <Box paddingBottom={2}>
      <PseudoBox
        as={(props) => <Link {...props} to={item.route} whileHover={{}} />}
        padding="2px"
        marginLeft="-2px"
        display="inline-block"
        fontSize={'sm'}
        fontWeight={isActive ? 500 : 400}
        color={isActive ? 'teal.300' : 'gray.200'}
      >
        {item.name}
      </PseudoBox>
    </Box>
  )
}

export default Sidebar
