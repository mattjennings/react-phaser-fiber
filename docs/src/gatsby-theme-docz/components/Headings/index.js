import React, { useState } from 'react'
import { Text, Icon, Box, PseudoBox, useColorMode } from '@chakra-ui/core'
import { css } from '@emotion/core'
const HeadingText = (props) => {
  const [showLink, setShowLink] = useState(false)

  const { colorMode } = useColorMode()

  const linkColor = colorMode === 'dark' ? 'gray.500' : 'gray.500'
  const hoverColor = colorMode === 'dark' ? 'gray.400' : 'gray.700'

  return !!props.id ? (
    <Text
      {...props}
      tabIndex="0"
      css={(theme) => css`
        /* add margin-top when it follows another element */
        :not(:first-of-type) {
          margin-top: ${theme.space[4]};
        }
      `}
      onFocus={() => setShowLink(true)}
      onBlur={() => setShowLink(false)}
      onMouseEnter={() => setShowLink(true)}
      onMouseLeave={() => setShowLink(false)}
    >
      <Box as="span" position="relative">
        {props.children}
        {showLink && (
          <PseudoBox
            as="a"
            position="absolute"
            color={linkColor}
            right={-24}
            top="-4px"
            href={`#${props.id}`}
            textDecoration="none"
            _hover={{
              color: hoverColor,
              textDecoration: 'none',
            }}
          >
            <Icon name="link" size="0.8em" />
          </PseudoBox>
        )}
      </Box>
    </Text>
  ) : (
    <Text {...props} />
  )
}

export const h2 = (props) => (
  <HeadingText
    as="h2"
    fontSize="2xl"
    fontFamily="heading"
    marginBottom={1}
    {...props}
  />
)

export const h3 = (props) => (
  <HeadingText
    as="h3"
    fontSize="xl"
    fontFamily="heading"
    marginBottom={1}
    {...props}
  />
)

export const h4 = (props) => (
  <HeadingText
    as="h4"
    fontSize="lg"
    fontFamily="heading"
    marginBottom={1}
    {...props}
  />
)

export const h5 = (props) => (
  <HeadingText as="h5" fontSize="md" marginBottom={1} {...props} />
)

export const h6 = (props) => (
  <HeadingText as="h6" fontSize="base" marginBottom={1} {...props} />
)
