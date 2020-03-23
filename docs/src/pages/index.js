import React from 'react'
import { Link } from 'gatsby'
import {
  Box,
  Text,
  Button,
  DarkMode,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/core'
import { motion } from 'framer-motion'
import MotionBox from '../components/MotionBox'

const headerVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.5 },
  },
}

const subtitleVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
  },
}

export default function Index() {
  const { colorMode } = useColorMode()

  return (
    <Box
      height="100vh"
      bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
    >
      <Box
        height={['100vh', '75vh']}
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MotionBox
          textAlign="center"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={headerVariants}>
            <Text
              fontWeight={500}
              fontSize={['3xl', '5xl', '5xl', '6xl']}
            >
              react-phaser-fiber
            </Text>
            <Text fontSize={['sm', 'xl', 'xl', '2xl']}>
              Create Phaser 3 games with React
            </Text>
          </motion.div>
          <motion.div variants={subtitleVariants}>
            <Button
              variant="ghost"
              variantColor="teal"
              as={Link}
              marginTop={4}
              to="/getting-started/installation/"
            >
              Get Started
            </Button>
          </motion.div>
        </MotionBox>
      </Box>
    </Box>
  )
}
