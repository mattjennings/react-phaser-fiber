import React, { useMemo } from 'react'
import { Playground as OriginalPlayground } from 'gatsby-theme-docz/src/components/Playground/index'
import { Game, Canvas } from 'react-phaser-fiber'
import { Box } from '@chakra-ui/core'

export const Playground = ({ scope, ...props }) => {
  const modifiedScope = useMemo(
    () => ({
      ...scope,

      // we need the canvas to render inside the preview, but we don't want to pollute every example
      // with a wrapped canvas
      Game: (gameProps) => (
        <Box display="flex" justifyContent="center" overflowX="hidden">
          <Canvas>
            <Game {...gameProps} />
          </Canvas>
        </Box>
      ),
    }),
    [scope]
  )
  return (
    <OriginalPlayground
      styles={{
        previewWrapper: {
          display: 'flex',
          overflowX: 'scroll',
        },
      }}
      scope={modifiedScope}
      {...props}
    />
  )
}
