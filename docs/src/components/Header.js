import { Box, IconButton, Text } from '@chakra-ui/core'
import styled from '@emotion/styled'
import React from 'react'
import { IoIosMenu } from 'react-icons/io'
import { useIsMobile } from '../hooks'
import { useColorMode } from './ColorModeProvider'
import { useSidebar } from './SidebarProvider'

const Header = ({ title }) => {
  const { openSidebar } = useSidebar()
  const isMobile = useIsMobile()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      height={60}
    >
      <Box display="flex">
        {isMobile && (
          <IconButton
            variant="ghost"
            aria-label="Open Menu"
            icon={() => <Box as={IoIosMenu} size="32px" />}
            onClick={openSidebar}
          />
        )}
        {title && (
          <Title fontSize="2xl" fontWeight={500}>
            {title}
          </Title>
        )}
      </Box>
      {/* disabled until https://github.com/chakra-ui/chakra-ui/issues/511 is fixed */}
      <IconButton
        variant="ghost"
        aria-label="Open Menu"
        icon={colorMode === 'dark' ? 'sun' : 'moon'}
        onClick={toggleColorMode}
      />
    </Box>
  )
}

const Title = styled(Text)`
  margin: 0;
  margin-left: ${({ theme }) => theme.space[2]};
`

export default Header
