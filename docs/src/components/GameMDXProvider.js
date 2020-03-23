import React, { useMemo } from 'react'
import { MDXProvider } from '@mdx-js/react'
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
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
  padding: 8px;
  font-size: 0.8em;
`

const Styles = styled.div`
  border-radius: 5px;
  overflow: hidden;
  canvas {
    border: 1px dashed #555555;
  }

  .spaces-resize-handle {
    z-index: 1;
    background: #555555;
    cursor: col-resize;
  }
  .spaces-resize-handle:hover {
    background: #666666;
  }
`

const scope = {
  ...ReactPhaserFiber,
  // wrap in a <Canvas> so we don't have to do it in examples
  Game: props => (
    <ReactPhaserFiber.Canvas>
      <ReactPhaserFiber.Game {...props} />
    </ReactPhaserFiber.Canvas>
  ),
}

const components = {
  pre: React.memo(props => {
    const theme = useTheme()
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
              color: '#808080',
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
      <Styles>
        <LiveProvider
          language="jsx"
          theme={codeTheme}
          code={props.children.props.children}
          scope={scope}
        >
          <Space.Fixed height={400}>
            <Space.LeftResizable size="60%">
              <StyledLiveEditor />
            </Space.LeftResizable>
            <Space.Fill>
              <StyledLivePreview />
              <StyledLiveError />
            </Space.Fill>
          </Space.Fixed>
        </LiveProvider>
      </Styles>
    )
  }),
}

export default function GameMDXProvider(props) {
  return <MDXProvider components={components} {...props} />
}
