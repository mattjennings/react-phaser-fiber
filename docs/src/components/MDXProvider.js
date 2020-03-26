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
import { css } from '@emotion/core'
import { useIsMobile } from '../hooks'

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

function Example(props) {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { colorMode } = useColorMode()
  const codeTheme = useMemo(
    () => ({
      plain: {
        color: '#9CDCFE',
        backgroundColor: theme.colors.gray[900],
        fontFamily: `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace`,
      },
      styles: [
        {
          types: ['prolog'],
          style: {
            color: 'rgb(0, 0, 128)',
          },
        },
        {
          types: ['comment'],
          style: {
            color: 'rgb(106, 153, 85)',
          },
        },
        {
          types: ['builtin', 'changed', 'keyword'],
          style: {
            color: 'rgb(86, 156, 214)',
          },
        },
        {
          types: ['number', 'inserted'],
          style: {
            color: 'rgb(181, 206, 168)',
          },
        },
        {
          types: ['constant'],
          style: {
            color: 'rgb(100, 102, 149)',
          },
        },
        {
          types: ['attr-name', 'variable'],
          style: {
            color: 'rgb(156, 220, 254)',
          },
        },
        {
          types: ['deleted', 'string', 'attr-value'],
          style: {
            color: 'rgb(206, 145, 120)',
          },
        },
        {
          types: ['selector'],
          style: {
            color: 'rgb(215, 186, 125)',
          },
        },
        {
          // Fix tag color
          types: ['tag'],
          style: {
            color: 'rgb(78, 201, 176)',
          },
        },
        {
          // Fix tag color for HTML
          types: ['tag'],
          languages: ['markup'],
          style: {
            color: 'rgb(86, 156, 214)',
          },
        },
        {
          types: ['punctuation', 'operator'],
          style: {
            color: 'rgb(212, 212, 212)',
          },
        },
        {
          // Fix punctuation color for HTML
          types: ['punctuation'],
          languages: ['markup'],
          style: {
            color: '#555555',
          },
        },
        {
          types: ['function'],
          style: {
            color: 'rgb(220, 220, 170)',
          },
        },
        {
          types: ['class-name'],
          style: {
            color: 'rgb(78, 201, 176)',
          },
        },
        {
          types: ['char'],
          style: {
            color: 'rgb(209, 105, 105)',
          },
        },
      ],
    }),
    [theme]
  )

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
        code={props.children.props.children}
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

const components = {
  pre: Example,
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
