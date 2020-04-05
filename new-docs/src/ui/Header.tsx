import { Box, IconButton, Text } from '@chakra-ui/core'
import React from 'react'
import { IoIosMenu } from 'react-icons/io'
import { useIsMobile } from '../hooks'
import { useSidebar } from '../components/SidebarProvider'
import { useColorMode } from 'theme-ui'

const Header = ({ title }) => {
  const { openSidebar } = useSidebar()
  const isMobile = useIsMobile()
  const [colorMode, setColorMode] = useColorMode()

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
        <Text as="h1" fontSize="2xl" fontWeight={500}>
          {title}
        </Text>
      </Box>
      <IconButton
        variant="ghost"
        aria-label="Toggle Color Theme"
        icon={colorMode === 'dark' ? 'sun' : 'moon'}
        onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
      />
    </Box>
  )
}

export default Header
