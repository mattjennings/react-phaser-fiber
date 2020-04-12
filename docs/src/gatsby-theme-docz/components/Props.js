import React from 'react'
import { Box, useTheme } from '@chakra-ui/core'
import { useColorMode } from '../../components/ColorModeProvider'
import { css } from '@emotion/core'

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
  const { colorMode } = useColorMode()

  if (!prop.type) return null

  const type = getPropType(prop)
    .replace(/\| (undefined|null)/gi, '')
    .trim()

  return (
    <TableRow>
      <TableCell
        fontWeight="medium"
        color={colorMode === 'dark' ? 'blue.400' : 'blue.500'}
      >
        {propName} {prop.required ? '*' : ''}
      </TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>
        {prop.defaultValue && <code>{getDefaultValue(prop)}</code>}
      </TableCell>
      <TableCell>{prop.description}</TableCell>
    </TableRow>
  )
}

export const Props = ({ props, getPropType }) => {
  const entries = Object.entries(props)
    .sort(([, aProp], [, bProp]) => {
      // sort required first
      if (aProp.required || bProp.required) {
        return -1
      }

      // then sort alphabetically
      return aProp.name < bProp.name ? -1 : 1
    })
    // remove any prop of name "key" (not a valid prop for react, prop may come from extending Phaser interface)
    .filter(([key]) => key !== 'key')

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Default</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entries.map(([key, prop]) => (
          <Prop
            key={key}
            propName={key}
            prop={prop}
            getPropType={getPropType}
          />
        ))}
      </TableBody>
    </Table>
  )
}

const Table = (props) => {
  const { colorMode } = useColorMode()
  const theme = useTheme()

  return (
    <Box
      overflow="hidden"
      overflowX="scroll"
      borderRadius={5}
      border={`1px solid ${
        colorMode === 'dark' ? theme.colors.gray[700] : theme.colors.gray[200]
      }`}
    >
      <Box
        as="table"
        overflow="hidden"
        fontSize={['0.7em', '0.7em', '0.9em']}
        css={(theme) => css`
          code {
            background-color: ${colorMode === 'dark'
              ? theme.colors.gray[700]
              : theme.colors.gray[200]};
            padding: 4px;
            margin-left: 2px;
            margin-right: 2px;
            border-radius: 5px;
            font-size: 0.9em;
          }
        `}
        {...props}
      />
    </Box>
  )
}

const TableHead = (props) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      as="thead"
      fontWeight="medium"
      css={(theme) => css`
        & td {
          background-color: ${colorMode === 'dark'
            ? theme.colors.gray[700]
            : theme.colors.gray[200]};
        }
      `}
      {...props}
    />
  )
}

const TableBody = (props) => {
  const { colorMode } = useColorMode()

  return (
    <Box
      as="tbody"
      css={(theme) => css`
        & td {
          background-color: ${colorMode === 'dark'
            ? theme.colors.gray[800]
            : theme.colors.gray[50]};
        }

        & tr:not(:last-child) td {
          border-bottom: 1px solid
            ${colorMode === 'dark'
              ? theme.colors.gray[700]
              : theme.colors.gray[200]};
        }
      `}
      {...props}
    />
  )
}

const TableRow = (props) => {
  return <Box as="tr" {...props} />
}

const TableCell = (props) => {
  return <Box as="td" paddingX={[2, 4, 6]} paddingY={2} {...props} />
}
