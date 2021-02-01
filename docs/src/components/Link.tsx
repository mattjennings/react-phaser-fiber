import React from 'react'
import {
  Link as ChakraLink,
  LinkProps,
  PseudoBox,
  theme,
  useTheme,
} from '@chakra-ui/core'
import { Link as GatsbyLink } from 'gatsby'

export default function Link(props: LinkProps & { to?: string }) {
  const theme = useTheme()

  return (
    <PseudoBox
      as={props.to ? GatsbyLink : ChakraLink}
      color="teal.400"
      _hover={{
        color: theme.colors.teal[300],
      }}
      {...props}
    />
  )
}
