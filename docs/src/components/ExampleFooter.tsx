import React from 'react'
import { Text } from '@chakra-ui/core'
import Link from './Link'

export default function ExampleFooter() {
  return (
    <Text marginTop={4}>
      Be sure to check out our{' '}
      <Link href="https://github.com/mattjennings/react-phaser-fiber/tree/docs/examples">
        other examples on github
      </Link>
    </Text>
  )
}
