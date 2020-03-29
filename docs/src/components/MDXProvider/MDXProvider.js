import { Box, Text, useColorMode } from '@chakra-ui/core'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import { useTheme } from 'emotion-theming'
import Highlight, {
  defaultProps,
} from 'prism-react-renderer'
import React, { useMemo } from 'react'
import getCodeTheme from './getCodeTheme'
import LiveJSX from './LiveJSX'

function Code({ children, className, live, ...props }) {
  const theme = useTheme()
  const { colorMode } = useColorMode()
  const codeTheme = useMemo(
    () => getCodeTheme(theme, colorMode),
    [theme, colorMode]
  )
  const language =
    className?.replace(/language-/, '') ?? 'none'

  if (live) {
    return (
      <LiveJSX
        codeTheme={codeTheme}
        code={children}
        noInline={props.noInline}
        customCanvas={props.customCanvas}
      />
    )
  }

  return (
    <Highlight
      {...defaultProps}
      theme={codeTheme}
      code={children}
      language={language}
    >
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => {
        const filteredTokens = tokens.filter((token, i) => {
          if (
            token.length > 1 ||
            (i > 0 && i < tokens.length - 1)
          ) {
            return true
          }

          // filter out empty lines at start/end
          return !token[0].empty
        })

        return (
          <Box
            as="pre"
            padding={2}
            marginY={4}
            className={className}
            style={style}
            borderRadius={5}
            fontSize="0.8em"
          >
            {filteredTokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
              >
                {line.map((token, key) => (
                  <span
                    key={key}
                    {...getTokenProps({ token, key })}
                  />
                ))}
              </div>
            ))}
          </Box>
        )
      }}
    </Highlight>
  )
}

const components = {
  code: Code,
  h1: (props) => (
    <Text
      fontSize="2xl"
      fontWeight={500}
      marginBottom={1}
      {...props}
    />
  ),
  h2: (props) => (
    <Text
      fontSize="xl"
      fontWeight={500}
      marginBottom={1}
      {...props}
    />
  ),
  h3: (props) => (
    <Text
      fontSize="lg"
      fontWeight={500}
      marginBottom={1}
      {...props}
    />
  ),
  h4: (props) => (
    <Text
      fontSize="md"
      fontWeight={500}
      marginBottom={1}
      {...props}
    />
  ),
  h5: (props) => (
    <Text
      fontSize="base"
      fontWeight={500}
      marginBottom={1}
      {...props}
    />
  ),
  h6: (props) => (
    <Text
      fontSize="base"
      fontWeight={500}
      marginBottom={1}
      {...props}
    />
  ),
}

export default function GameMDXProvider(props) {
  return (
    <BaseMDXProvider components={components} {...props} />
  )
}
