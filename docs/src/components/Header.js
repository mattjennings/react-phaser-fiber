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
    <header
      css={theme => css`
        /* background: ${theme.colors.brand[700]}; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${theme.space[2]};
        margin-bottom: 1.45rem;
        height: 60px;
      `}
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
    </header>
  )
}

const Title = styled(Text)`
  margin: 0;
  margin-left: ${({ theme }) => theme.space[2]};
`

export default Header
