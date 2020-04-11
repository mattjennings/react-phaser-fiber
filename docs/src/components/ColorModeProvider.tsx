import React, { useContext, useMemo } from 'react'
import { ColorModeProvider as ChakraColorModeProvider } from '@chakra-ui/core'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const ColorModeContext = React.createContext({
  colorMode: 'light',
  toggleColorMode: () => null,
})

export default function ColorModeProvider({ children }) {
  // ThemeToggler is used so that dark/light mode isn't broken in production. see:
  // https://github.com/chakra-ui/chakra-ui/issues/305
  // https://github.com/chakra-ui/chakra-ui/issues/349
  // https://github.com/chakra-ui/chakra-ui/issues/511
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
        const colorMode = theme || 'light'
        const toggleColorMode = () =>
          toggleTheme(colorMode === 'dark' ? 'light' : 'dark')
        return (
          <ColorModeContext.Provider
            value={{
              colorMode,
              toggleColorMode,
            }}
          >
            <ChakraColorModeProvider key={colorMode} value={colorMode}>
              {children}
            </ChakraColorModeProvider>
          </ColorModeContext.Provider>
        )
      }}
    </ThemeToggler>
  )
}

export function useColorMode() {
  return useContext(ColorModeContext)
}
