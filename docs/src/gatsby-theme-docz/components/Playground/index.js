/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React, { useMemo, useState, useEffect } from 'react'
import { LiveProvider, LiveError, LivePreview, LiveEditor } from 'react-live'
import { Resizable } from 're-resizable'
import copy from 'copy-text-to-clipboard'
import { Game, Canvas } from 'react-phaser-fiber'

import { Wrapper } from './Wrapper'
import {
  IconButton,
  Box,
  useColorMode,
  useTheme,
  Tooltip,
} from '@chakra-ui/core'
import { usePrismTheme } from '../../../hooks/usePrismTheme'

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

const Memod = React.memo(LiveProvider)

export const Playground = ({
  code,
  scope,
  language,
  useScoping = false,
  ...other
}) => {
  const customCanvas = code.includes('<Canvas')
  const modifiedScope = useMemo(
    () => ({
      ...scope,
      // we need the canvas to render inside the preview, but we don't want to pollute every example
      // with a wrapped canvas
      Game: (gameProps) =>
        customCanvas ? (
          <Game {...gameProps} />
        ) : (
          <Canvas>
            <Game {...gameProps} />
          </Canvas>
        ),
    }),
    [
      // awful, awful hack. a hot reload in dev causes infinite renders if scope/code are dependencies,
      // but we do want the memo to run, so we'll just enable it for production
      ...(process.env.NODE_ENV === 'production' ? [scope, customCanvas] : []),
    ]
  )

  const { colorMode } = useColorMode()

  const prismTheme = usePrismTheme()

  const [width, setWidth] = useState('100%')
  const resizableProps = getResizableProps(width, setWidth)
  const copyCode = () => copy(code)

  return (
    <Box paddingY={2} maxWidth={800} marginX="auto">
      <Resizable {...resizableProps} data-testid="playground">
        <LiveProvider
          code={code}
          scope={modifiedScope}
          transformCode={transformCode}
          language={language}
          theme={prismTheme}
        >
          <Box position="relative">
            <Wrapper content="preview" useScoping={useScoping}>
              <Box
                display="flex"
                overflowX="hidden"
                justifyContent="center"
                border="1px solid"
                borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.300'}
                borderTopLeftRadius={5}
                borderTopRightRadius={5}
                background={prismTheme.plain.backgroundColor}
                minHeight={400}
              >
                <Box as={LivePreview} margin={0} />
              </Box>

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
            </Wrapper>
            <Box position="relative" zIndex={5}>
              <CopyButton
                onClick={copyCode}
                position="absolute"
                right={1}
                top={1}
              />
            </Box>
          </Box>
          <Wrapper content="editor" useScoping={useScoping}>
            <Box
              p={2}
              background={prismTheme.plain.backgroundColor}
              border="1px solid"
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.300'}
              borderTop={0}
              borderBottomLeftRadius={5}
              borderBottomRightRadius={5}
              fontFamily="monospace"
              fontSize={16}
              css={css`
                pre {
                  /* keep text selectable when editor is disabled */
                  pointer-events: auto !important;
                }
                * > textarea:focus {
                  outline: none;
                }
              `}
            >
              <LiveEditor data-testid="live-editor" disabled />
            </Box>
          </Wrapper>
        </LiveProvider>
      </Resizable>
    </Box>
  )
}

function CopyButton({ onClick, ...props }) {
  const [icon, setIcon] = useState('copy')
  const { colorMode } = useColorMode()

  useEffect(() => {
    if (icon !== 'copy') {
      const timeout = setTimeout(() => setIcon('copy'), 2000)

      return () => clearTimeout(timeout)
    }
  }, [icon])

  const variants = {
    copy: {
      light: {
        backgroundColor: 'gray.200',
        _hover: {
          backgroundColor: 'gray.300',
        },
      },
      dark: {},
    },
    check: {
      light: {
        variantColor: 'green',
      },
      dark: {
        variantColor: 'green',
      },
    },
  }

  return (
    <Tooltip label="Copy">
      <IconButton
        icon={icon}
        onClick={() => {
          onClick()
          setIcon('check')
        }}
        {...variants[icon][colorMode]}
        {...props}
      />
    </Tooltip>
  )
}
