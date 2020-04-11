/** @jsx jsx */
import { Box, useTheme, useColorMode } from '@chakra-ui/core'
import { jsx } from 'theme-ui'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Page({ children, doc }: any) {
  const { colorMode } = useColorMode()

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        as="main"
        height="100vh"
        flexGrow={1}
        overflow="scroll"
        paddingX={[2, 4]}
        paddingBottom={4}
        bg={colorMode === 'dark' ? 'gray.900' : 'white'}
      >
        <Header doc={doc} />
        {children}
      </Box>
    </Box>
  )
}
