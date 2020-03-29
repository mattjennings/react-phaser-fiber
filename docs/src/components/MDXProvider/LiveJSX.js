import { Box, Button, useColorMode } from '@chakra-ui/core'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React, {
  useState,
  useMemo,
  useCallback,
} from 'react'
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live'
import * as ReactPhaserFiber from 'react-phaser-fiber'
import * as Space from 'react-spaces'
import { useIsMobile } from '../../hooks'

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

  textarea,
  pre {
    overflow: scroll;
    height: 100%;
    width: 100%;
  }

  /* 
  the outline shows over the overflowed container, covering the code if the user scrolls. 
  we should think of a better way to fix this
  */
  textarea:focus {
    outline: none;
  }
`

const StyledLivePreview = styled(
  ({ colorMode, ...props }) => <LivePreview {...props} />
)`
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

function MobileEditor() {
  const { colorMode } = useColorMode()
  const [showCode, setShowCode] = useState(true) // if mobile, toggles showing code or game

  return (
    <Box position="relative" height="400px">
      <Box
        height={400}
        overflow="scroll"
        display={showCode ? 'block' : 'none'}
      >
        <StyledLiveEditor />
      </Box>
      <Box
        height={400}
        display={showCode ? 'none' : 'block'}
      >
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
        <Box height={400} overflow="scroll">
          <StyledLiveEditor />
        </Box>
      </Space.LeftResizable>
      <Space.Fill>
        <Box height={400}>
          <StyledLivePreview colorMode={colorMode} />
          <StyledLiveError />
        </Box>
      </Space.Fill>
    </Space.Fixed>
  )
}

function LiveJSX({
  codeTheme,
  code,
  noInline,
  customCanvas,
}) {
  const isMobile = useIsMobile()
  const scope = useMemo(
    () => ({
      ...ReactPhaserFiber,
      // in some examples we might want to show the `render`, but we don't want the editor to do anything with it
      render: () => void 0,
      Game: (props) =>
        customCanvas ? (
          <ReactPhaserFiber.Game {...props} />
        ) : (
          <ReactPhaserFiber.Canvas>
            <ReactPhaserFiber.Game {...props} />
          </ReactPhaserFiber.Canvas>
        ),
    }),
    [customCanvas]
  )

  return (
    <Box
      minHeight={400}
      borderRadius={5}
      marginY={4}
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
        noInline={noInline}
        language="jsx"
        theme={codeTheme}
        code={code}
        scope={scope}
        transformCode={useCallback((code) => {
          // remove import statements from examples so we can still show them but ignore
          // parsing them
          const sanitized = code.replace(
            /import .*from ('([^']+)')/gis,
            ''
          )

          return sanitized
        }, [])}
      >
        {isMobile ? <MobileEditor /> : <DesktopEditor />}
      </LiveProvider>
    </Box>
  )
}

export default React.memo(LiveJSX)
