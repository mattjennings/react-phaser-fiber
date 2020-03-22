import { useMediaQuery } from 'react-responsive'
import { useTheme } from '@chakra-ui/core'

export function useIsMobile() {
  const theme = useTheme()
  return useMediaQuery({
    query: `(max-width: ${theme.breakpoints.sm})`,
  })
}
