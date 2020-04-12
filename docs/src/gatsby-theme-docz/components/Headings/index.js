import React from 'react'
import { Text, PseudoBox } from '@chakra-ui/core'

const HeadingText = (props) => {
  return !!props.id ? (
    <Text {...props}>
      <PseudoBox
        as="a"
        href={`#${props.id}`}
        color="inherit"
        textDecoration="none"
        _hover={{
          textDecoration: 'underline',
        }}
      >
        {props.children}
      </PseudoBox>
    </Text>
  ) : (
    <Text {...props} />
  )
}

export const h2 = (props) => (
  <HeadingText
    as="h2"
    fontSize="xl"
    fontFamily="heading"
    marginBottom={1}
    {...props}
  />
)

export const h3 = (props) => (
  <HeadingText
    as="h3"
    fontSize="lg"
    fontFamily="heading"
    marginBottom={1}
    {...props}
  />
)

export const h4 = (props) => (
  <HeadingText
    as="h4"
    fontSize="md"
    fontFamily="heading"
    marginBottom={1}
    {...props}
  />
)

export const h5 = (props) => (
  <HeadingText as="h5" fontSize="base" marginBottom={1} {...props} />
)

export const h6 = (props) => (
  <HeadingText as="h6" fontSize="base" marginBottom={1} {...props} />
)
