/* eslint react/jsx-key: 0 */
import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx } from 'theme-ui'

import { usePrismTheme } from '../../../hooks/usePrismTheme'
import { useTheme, useColorMode, Box } from '@chakra-ui/core'

export const Code = ({ children, className: outerClassName }) => {
  const [language] = outerClassName
    ? outerClassName.replace(/language-/, '').split(' ')
    : ['text']
  const prismTheme = usePrismTheme()
  const { colorMode } = useColorMode()

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          as="pre"
          padding={2}
          marginY={2}
          className={`${outerClassName || ''} ${className}`}
          overflowX="auto"
          style={style}
          border="1px solid"
          borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
          borderRadius={5}
          fontSize="sm"
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                  sx={{ display: 'inline-block' }}
                />
              ))}
            </div>
          ))}
        </Box>
      )}
    </Highlight>
  )
}
