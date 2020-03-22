import React from 'react'
import { Link as ChakraLink } from '@chakra-ui/core'
import { Link as GatsbyLink } from 'gatsby'
import { css, jsx } from '@emotion/core'

export default function Link(props) {
  return (
    <ChakraLink
      as={GatsbyLink}
      {...props}
      css={theme => css`
        &:hover {
          font-weight: ${theme.fontWeights.medium};
          text-decoration: none;
        }
      `}
    />
  )
}
