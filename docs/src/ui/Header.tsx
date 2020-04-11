import { Box, IconButton, Text } from '@chakra-ui/core'
import React from 'react'
import { IoIosMenu } from 'react-icons/io'
import { useIsMobile } from '../hooks'
import { useSidebar } from '../components/SidebarProvider'
import { useColorMode } from '../components/ColorModeProvider'

const Header = ({ doc }: { doc: any }) => {
  const { openSidebar } = useSidebar()
  const isMobile = useIsMobile()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingY={2}
      height={60}
    >
      <Box display="flex">
        {isMobile && (
          <IconButton
            variant="ghost"
            aria-label="Open Menu"
            icon={() => <Box as={IoIosMenu} size="32px" />}
            onClick={openSidebar}
            marginRight={2}
            marginLeft="-8px"
          />
        )}
        <Box display="flex" flexDirection="column">
          <Text as="h1" fontSize="2xl">
            {doc.value.name}
          </Text>
        </Box>
      </Box>
      <IconButton
        variant="ghost"
        aria-label="Toggle Color Theme"
        icon={colorMode === 'dark' ? 'sun' : 'moon'}
        onClick={() => toggleColorMode()}
      />
    </Box>
  )
}

export default Header
