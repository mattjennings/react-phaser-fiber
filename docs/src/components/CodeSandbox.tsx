import React, { useState } from 'react'
import { Box, Text } from '@chakra-ui/core'
import qs from 'query-string'

export interface CodeSandboxProps {
  name: string
  src: string
}

export default function CodeSandbox({
  src,
  name,
  ...config
}: CodeSandboxProps) {
  const params = qs.stringify({
    fontSize: 14,
    hidenavigation: 1,
    theme: 'dark',
    ...config,
  })

  return (
    <iframe
      src={`${src}?${params}`}
      style={{
        width: '100%',
        height: 500,
        border: 0,
        borderRadius: 4,
        overflow: 'hidden',
      }}
      title={name}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}
