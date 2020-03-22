import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { useIsMobile } from '../hooks'
import { css, jsx } from '@emotion/core'
import { IconButton, Box, Text } from '@chakra-ui/core'
import { IoIosMenu } from 'react-icons/io'
import styled from '@emotion/styled'

const Header = ({ title, onSidebarOpen }) => {
  const isMobile = useIsMobile()

  return (
    <header
      css={theme => css`
        /* background: ${theme.colors.brand[700]}; */
        display: flex;
        align-items: center;
        padding: ${theme.space[2]};
        margin-bottom: 1.45rem;
        height: 60px;
      `}
    >
      {isMobile && (
        <IconButton
          variant="ghost"
          aria-label="Open Menu"
          icon={() => <Box as={IoIosMenu} size="32px" />}
          onClick={onSidebarOpen}
        />
      )}
      <Title fontSize="2xl">{title}</Title>
    </header>
  )
}

const Title = styled(Text)`
  margin: 0;
  margin-left: ${({ theme }) => theme.space[2]};
`

export default Header
