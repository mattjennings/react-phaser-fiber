import React, { useMemo, useState } from 'react'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live'
import * as ReactPhaserFiber from 'react-phaser-fiber'
import * as Space from 'react-spaces'
import styled from '@emotion/styled'
import { useTheme } from 'emotion-theming'
import {
  useColorMode,
  Box,
  Button,
  Text,
} from '@chakra-ui/core'
import { css, jsx } from '@emotion/core'
import { useIsMobile } from '../../hooks'
import Highlight, {
  defaultProps,
} from 'prism-react-renderer'
import getCodeTheme from './getCodeTheme'

const StyledLiveEditor = styled(LiveEditor)`
  line-height: 1.5;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  font-size: 80%;
  font-feature-settings: 'clig' 0, 'calt' 0;
  font-variant: no-common-ligatures
    no-discretionary-ligatures no-historical-ligatures
    no-contextual;
  font-variant-ligatures: none;
  font-variant-caps: normal;
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  width: 100%;
  height: 100%;

  textarea,
  pre {
    overflow: scroll;
  }

  /* 
  the outline shows over the overflowed container, covering the code if the user scrolls. 
  we should think of a better way to fix this
  */
  textarea:focus {
    outline: none;
  }
`

const StyledLivePreview = styled(LivePreview)`
  --checkerboard-color: ${({ colorMode }) =>
    colorMode === 'dark' ? '#606060' : '#bfbfbf'};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      45deg,
      var(--checkerboard-color) 25%,
      transparent 25%
    ),
    linear-gradient(
      -45deg,
      var(--checkerboard-color) 25%,
      transparent 25%
    ),
    linear-gradient(
      45deg,
      transparent 75%,
      var(--checkerboard-color) 75%
    ),
    linear-gradient(
      -45deg,
      transparent 75%,
      var(--checkerboard-color) 75%
    );
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`

const StyledLiveError = styled(LiveError)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  color: red;
  padding: 8px;
  font-size: 0.8em;
`

const scope = {
  ...ReactPhaserFiber,
  // wrap in a <Canvas> so we don't have to do it in examples
  Game: (props) => (
    <ReactPhaserFiber.Canvas>
      <ReactPhaserFiber.Game {...props} />
    </ReactPhaserFiber.Canvas>
  ),
}

function LiveJSX({ codeTheme, code }) {
  const isMobile = useIsMobile()
  const { colorMode } = useColorMode()

  return (
    <Box
      minHeight={400}
      borderRadius={5}
      border="1px solid"
      borderColor={
        colorMode === 'dark' ? 'gray.700' : 'gray.400'
      }
      overflow="hidden"
      css={(theme) => css`
        .spaces-resize-handle {
          z-index: 1;
          background: #555555;
          cursor: col-resize;
        }
        .spaces-resize-handle:hover {
          background: #666666;
        }
      `}
    >
      <LiveProvider
        language="jsx"
        theme={codeTheme}
        code={code}
        scope={scope}
        transformCode={(code) => {
          // remove import statements from examples so we can still show them but ignore
          // parsing them
          const sanitized = code.replace(
            /import .*from ('([^']+)')/gi,
            ''
          )
          return sanitized
        }}
      >
        {isMobile ? <MobileEditor /> : <DesktopEditor />}
      </LiveProvider>
    </Box>
  )
}

function MobileEditor() {
  const { colorMode } = useColorMode()
  const [showCode, setShowCode] = useState(false) // if mobile, toggles showing code or game

  return (
    <Box position="relative" height="400px">
      <StyledLiveEditor
        style={{
          overflow: 'scroll',
          display: !showCode ? 'none' : 'block',
        }}
      />
      <Box display={showCode ? 'none' : 'block'}>
        <StyledLivePreview colorMode={colorMode} />
        <StyledLiveError />
      </Box>
      <Button
        variant="solid"
        position="absolute"
        variantColor="teal"
        bottom={2}
        right={2}
        onClick={() => setShowCode(!showCode)}
      >
        {showCode ? 'View Result' : 'View Code'}
      </Button>
    </Box>
  )
}

function DesktopEditor() {
  const { colorMode } = useColorMode()

  return (
    <Space.Fixed height={400}>
      <Space.LeftResizable size="60%">
        <StyledLiveEditor style={{ overflow: 'scroll' }} />
      </Space.LeftResizable>
      <Space.Fill>
        <StyledLivePreview colorMode={colorMode} />
        <StyledLiveError />
      </Space.Fill>
    </Space.Fixed>
  )
}

function Code({ children, className, live }) {
  const theme = useTheme()
  const { colorMode } = useColorMode()
  const codeTheme = useMemo(
    () => getCodeTheme(theme, colorMode),
    [theme, colorMode]
  )
  const language =
    className?.replace(/language-/, '') ?? 'none'

  if (live) {
    return <LiveJSX codeTheme={codeTheme} code={children} />
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
            marginY={3}
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
    <Text fontSize="3xl" fontWeight={500} {...props} />
  ),
  h2: (props) => (
    <Text fontSize="2xl" fontWeight={500} {...props} />
  ),
  h3: (props) => (
    <Text fontSize="xl" fontWeight={500} {...props} />
  ),
  h4: (props) => <Text fontSize="lg" {...props} />,
  h5: (props) => <Text fontSize="md" {...props} />,
  h6: (props) => <Text fontSize="sm" {...props} />,
}

export default function GameMDXProvider(props) {
  return (
    <BaseMDXProvider components={components} {...props} />
  )
}
