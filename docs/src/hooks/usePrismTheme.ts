import { useTheme, useColorMode } from '@chakra-ui/core'

export function usePrismTheme() {
  const theme = useTheme()
  const { colorMode } = useColorMode()

  return theme.prism[colorMode]
}
