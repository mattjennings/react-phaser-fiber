/** @jsx jsx */
import { Box, useTheme, useColorMode } from '@chakra-ui/core'
import { jsx } from 'theme-ui'
import Sidebar from './Sidebar'
import Header from './Header'
import { useConfig } from 'docz'

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
        bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}
      >
        <Header title={doc.value.name} />
        {children}
      </Box>
    </Box>
  )
}
