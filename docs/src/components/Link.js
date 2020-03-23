import React from 'react'
import { Link as ChakraLink } from '@chakra-ui/core'
import { Link as GatsbyLink } from 'gatsby'
import { css, jsx } from '@emotion/core'
import { motion } from 'framer-motion'

const MotionChakraLink = motion.custom(ChakraLink)

export default function Link(props) {
  return (
    <MotionChakraLink
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      as={GatsbyLink}
      textAlign="center"
      _hover={{
        textDecoration: 'none',
      }}
      {...props}
    >
      {props.children}
    </MotionChakraLink>
  )
}
