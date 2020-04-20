import React from 'react'
import {
  Link as ChakraLink,
  LinkProps,
  PseudoBox,
  theme,
  useTheme,
} from '@chakra-ui/core'

export default function Link(props: LinkProps) {
  const theme = useTheme()

  return (
    <ChakraLink
      color="teal.400"
      _hover={{
        color: theme.colors.teal[300],
      }}
      {...props}
    />
  )
}
