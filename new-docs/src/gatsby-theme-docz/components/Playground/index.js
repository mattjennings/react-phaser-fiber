/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React, { useMemo, useState } from 'react'
import { useConfig } from 'docz'
import { LiveProvider, LiveError, LivePreview, LiveEditor } from 'react-live'
import { Resizable } from 're-resizable'
import copy from 'copy-text-to-clipboard'
import { Game, Canvas } from 'react-phaser-fiber'

import { Wrapper } from './Wrapper'
import { usePrismTheme } from '~utils/theme'
import { IconButton, Box, useColorMode } from '@chakra-ui/core'

const getResizableProps = (width, setWidth) => ({
  minWidth: 260,
  maxWidth: '100%',
  size: {
    width: width,
    height: 'auto',
  },
  style: {
    margin: 0,
    marginRight: 'auto',
  },
  enable: {
    top: false,
    right: true,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  },
  onResizeStop: (e, direction, ref) => {
    setWidth(ref.style.width)
  },
})

const transformCode = (code) => {
  if (code.startsWith('()') || code.startsWith('class')) return code
  return `<React.Fragment>${code}</React.Fragment>`
}

const styles = {
  editor: () => ({}),
}
export const Playground = ({ code, scope, language, useScoping = false }) => {
  const {
    themeConfig: { showPlaygroundEditor, showLiveError, showLivePreview },
  } = useConfig()

  const modifiedScope = useMemo(
    () => ({
      ...scope,
      // we need the canvas to render inside the preview, but we don't want to pollute every example
      // with a wrapped canvas
      Game: (gameProps) => (
        <Canvas>
          <Game {...gameProps} />
        </Canvas>
      ),
    }),
    [scope]
  )

  const theme = usePrismTheme()
  const [width, setWidth] = useState('100%')
  const resizableProps = getResizableProps(width, setWidth)
  const { colorMode } = useColorMode()
  const copyCode = () => copy(code)

  return (
    <Box paddingBottom={4}>
      <Resizable {...resizableProps} data-testid="playground">
        <LiveProvider
          code={code}
          scope={modifiedScope}
          transformCode={transformCode}
          language={language}
          theme={theme}
        >
          <Box position="relative">
            <Wrapper content="preview" useScoping={useScoping}>
              <Box
                display="flex"
                overflowX="hidden"
                justifyContent="center"
                border="1px solid"
                borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
                borderTopLeftRadius={5}
                borderTopRightRadius={5}
                css={css`
                  --checkerboard-color: ${colorMode === 'dark'
                    ? '#606060'
                    : '#bfbfbf'};
                  background-color: ${theme.plain.backgroundColor};
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
                `}
              >
                {showLivePreview && <Box as={LivePreview} margin={0} />}
              </Box>
              {showLiveError && (
                <Box
                  as={LiveError}
                  position="absolute"
                  top={0}
                  right={0}
                  left={0}
                  bottom={0}
                  margin={0}
                  paddingY={2}
                  paddingX={3}
                  color="#FF4757"
                  backgroundColor="rgba(255,255,255, 0.85)"
                  whiteSpace="pre-wrap"
                />
              )}
            </Wrapper>
            <Box position="relative" zIndex={5}>
              <IconButton
                icon="copy"
                onClick={copyCode}
                position="absolute"
                right={1}
                top={0}
              />
            </Box>
          </Box>
          <Wrapper content="editor" useScoping={useScoping}>
            <Box
              p={2}
              background={theme.plain.backgroundColor}
              border="1px solid"
              borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
              borderTop={0}
              borderBottomLeftRadius={5}
              borderBottomRightRadius={5}
              fontFamily="monospace"
              fontSize={18}
              css={css`
                * > textarea:focus {
                  outline: none;
                }
              `}
            >
              <LiveEditor data-testid="live-editor" />
            </Box>
          </Wrapper>
        </LiveProvider>
      </Resizable>
    </Box>
  )
}
