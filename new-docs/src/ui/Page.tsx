/** @jsx jsx */
import { Box } from '@chakra-ui/core'
import { jsx, useColorMode } from 'theme-ui'
import Sidebar from './Sidebar'

export default function Page({ children, doc }) {
  const [colorMode] = useColorMode()

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        as="main"
        height="100vh"
        flexGrow={1}
        overflow="scroll"
        paddingX={[0, 0, 2]}
        bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}
      >
        {children}
      </Box>
    </Box>
  )
}
