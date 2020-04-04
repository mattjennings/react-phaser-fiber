/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { Box } from '@chakra-ui/core'
import { useConfig } from 'docz'

export const getDefaultValue = ({ defaultValue, type }) => {
  if (!defaultValue || !defaultValue.value) return null
  if (defaultValue.value === "''") {
    return '[Empty string]'
  }
  if (type && type.name === 'string') {
    return defaultValue.value.replace(/\'/g, '"')
  }
  if (typeof defaultValue.value === 'object' && defaultValue.value.toString) {
    return defaultValue.value.toString()
  }
  return defaultValue.value
}

export const Prop = ({ propName, prop, getPropType }) => {
  if (!prop.type) return null

  const type = getPropType(prop).replace('| undefined', '')

  return (
    <Box as="tr">
      <Box as="td" paddingX={2}>
        {propName} {prop.required ? '*' : ''}
      </Box>
      <Box as="td" paddingX={2}>
        {type}
      </Box>
      <Box as="td" paddingX={2}>
        {prop.description}
      </Box>
      {/* {prop.defaultValue && (
        <div sx={styles.defaultValue} data-testid="prop-default-value">
          <em>{getDefaultValue(prop)}</em>
        </div>
      )}
      <div sx={styles.right}>
        {prop.required && (
          <div sx={styles.propRequired} data-testid="prop-required">
            <strong>required</strong>
          </div>
        )} */}
    </Box>
  )
}

export const Props = ({ props, getPropType }) => {
  const theme = useConfig()
  const entries = Object.entries(props).sort(([, aProp], [, bProp]) => {
    // sort required first
    if (aProp.required || bProp.required) {
      return -1
    }

    // then sort alphabetically
    return aProp.name < bProp.name ? -1 : 1
  })

  return (
    <Box as="table" fontSize="0.9em">
      <Box as="thead">
        <Box as="tr">
          <Box as="td" paddingX={2}>
            Name
          </Box>
          <Box as="td" paddingX={2}>
            Type
          </Box>
          <Box as="td" paddingX={2}>
            Description
          </Box>
        </Box>
      </Box>
      <Box as="tbody">
        {entries.map(([key, prop]) => (
          <Prop
            key={key}
            propName={key}
            prop={prop}
            getPropType={getPropType}
          />
        ))}
      </Box>
    </Box>
  )
}
