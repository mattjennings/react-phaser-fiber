import { Link as ChakraLink, PseudoBoxProps } from '@chakra-ui/core'
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import React from 'react'

export default function HeaderLink(
  props: GatsbyLinkProps<{}> & PseudoBoxProps
) {
  return (
    <ChakraLink
      as={GatsbyLink as any}
      textAlign="center"
      _hover={{
        textDecoration: 'none',
        color: 'teal.300',
      }}
      {...(props as any)}
    >
      {props.children}
    </ChakraLink>
  )
}
