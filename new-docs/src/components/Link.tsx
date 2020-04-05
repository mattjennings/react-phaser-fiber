import React from 'react'
import { Link as ChakraLink, PseudoBoxProps } from '@chakra-ui/core'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'

export default function Link(props: GatsbyLinkProps<{}> & PseudoBoxProps) {
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
