/** @jsx jsx */
import React, { useMemo } from 'react'
import { Playground as OriginalPlayground } from 'gatsby-theme-docz/src/components/Playground/index'
import { Game, Canvas } from 'react-phaser-fiber'
import { Flex, Box, jsx } from 'theme-ui'

export const Playground = ({ scope, ...props }) => {
  const modifiedScope = useMemo(
    () => ({
      ...scope,

      // we need the canvas to render inside the preview, but we don't want to pollute every example
      // with a wrapped canvas
      Game: (gameProps) => (
        <Flex
          sx={{
            justifyContent: 'center',
            overflowX: 'hidden',
          }}
        >
          <Canvas>
            <Game {...gameProps} />
          </Canvas>
        </Flex>
      ),
    }),
    [scope]
  )
  return (
    <Box
      sx={{
        marginBottom: 4,
      }}
    >
      <OriginalPlayground scope={modifiedScope} {...props} />
    </Box>
  )
}
