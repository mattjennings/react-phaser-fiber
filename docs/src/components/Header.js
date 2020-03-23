import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { useIsMobile } from '../hooks'
import { css, jsx } from '@emotion/core'
import {
  IconButton,
  Box,
  Text,
  useColorMode,
} from '@chakra-ui/core'
import { IoIosMenu } from 'react-icons/io'
import styled from '@emotion/styled'
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
        <Title fontSize="2xl">{title}</Title>
      </Box>
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
