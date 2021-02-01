import React from 'react'
// @ts-ignore
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
// @ts-ignore
import { ColorModeContext } from '@chakra-ui/core/dist/ColorModeProvider'

// Chakra's ColorModeProvider is bugged in several ways. So we'll use our own.
// see:
// https://github.com/chakra-ui/chakra-ui/issues/305
// https://github.com/chakra-ui/chakra-ui/issues/349
// https://github.com/chakra-ui/chakra-ui/issues/511
// https://github.com/chakra-ui/chakra-ui/issues/573
export default function ColorModeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: any) => {
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
            {children}
          </ColorModeContext.Provider>
        )
      }}
    </ThemeToggler>
  )
}
