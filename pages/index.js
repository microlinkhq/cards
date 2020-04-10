import { Button, Textarea, Text, Select, Box, Flex, useThemeUI } from 'theme-ui'
import { marshall, unmarshall } from '@lib/compress-json'
import * as templates from '@components/templates'
import useQueryState from '@hooks/use-query-state'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import debounce from '@lib/debounce'
import themeBase from '@themes/base'
import isEmpty from '@lib/is-empty'
import Main from '@components/main'
import decamelize from 'decamelize'

import Cycled from 'cycled'

import pkg from '../package.json'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@components/live-editor'

const Container = styled(Flex)`
  height: 100vh;
`

const DEFAULT_COLOR_MODE = 'github'

const DEFAULT_PRESET = 'preset: simple'

const DEFAULT_QUERY_VARIABLES = {
  headline: 'Add your headline',
  caption: 'Add your caption'
}

const updateUrl = debounce(({ setQuery, code, queryVariables }) => {
  setQuery({
    s: marshall(code),
    ...queryVariables
  })
})

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

export default () => {
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [preset] = useState(query.preset || DEFAULT_PRESET)
  const presetName = preset.split(' ')[1]
  const [code, setCode] = useState(templates[presetName])
  const [isLoading, setIsLoading] = useState(true)
  const [queryVariables, setQueryVariables] = useState(
    isEmpty(query) ? DEFAULT_QUERY_VARIABLES : query
  )

  useEffect(() => {
    if (isEmpty(query)) {
      setQuery({ preview: true })
    } else {
      const { p, preview, ...queryVariables } = query
      setQueryVariables({ ...DEFAULT_QUERY_VARIABLES, ...queryVariables })
      if (p) setCode(unmarshall(p))
    }
    setIsLoading(false)
  }, [])

  const handleCode = newCode => {
    setCode(newCode)
    updateUrl({ setQuery, code, queryVariables })
  }

  const handleQueryVariables = event => {
    const payload = event.target.value
    try {
      const json = JSON.parse(payload)
      setQueryVariables(json)
      updateUrl({ setQuery, code, queryVariables: json })
    } catch (_) {}
  }

  if (colorMode === 'default') setColorMode(DEFAULT_COLOR_MODE)
  if (isLoading) return null

  const isPreview = query.preview

  return (
    <LiveProvider
      theme={theme.colors.modes[colorMode]}
      queryVariables={queryVariables}
      code={code}
    >
      <Container>
        <Main>
          <LivePreview isPreview={isPreview} />
          <LiveError />
        </Main>
        {isPreview && (
          <Flex
            as='aside'
            sx={{
              height: '100%',
              bg: 'plain.backgroundColor',
              flexDirection: 'column',
              width: ['30%', '30%', '30%', '30%'],
              fontSize: 2,
              fontFamily: 'mono',
              fontWeight: 'light'
            }}
          >
            <Flex
              as='header'
              sx={{
                borderBottom: '1px solid',
                borderColor: 'plain.color',
                bg: 'plain.backgroundColor',
                color: 'plain.color',
                p: 3,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Flex
                sx={{
                  alignItems: 'center'
                }}
              >
                <Select
                  defaultValue={DEFAULT_PRESET}
                  sx={{
                    fontSize: 1,
                    width: '8rem',
                    p: '2px 8px'
                  }}
                >
                  <option>{DEFAULT_PRESET}</option>
                </Select>
              </Flex>
              <Box>
                <Text
                  sx={{
                    fontSize: 1
                  }}
                >
                  <Button
                    sx={{
                      bg: 'plain.color',
                      color: 'plain.backgroundColor',
                      fontSize: 0,
                      ml: 2
                    }}
                    onClick={() => setColorMode(nextMode())}
                  >
                    {decamelize(colorMode, ' ')}
                  </Button>
                </Text>
              </Box>
            </Flex>
            <Flex sx={{ flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <Box
                as='section'
                sx={{ flex: '1 0 60%', p: 3, overflow: 'auto' }}
              >
                <LiveEditor onChange={handleCode} />
              </Box>
              <Box
                as='section'
                sx={{
                  height: '25%',
                  p: 3,
                  bg: 'plain.backgroundColor',
                  borderTop: '1px solid',
                  borderColor: 'plain.color',
                  overflow: 'scroll'
                }}
              >
                <Textarea
                  sx={{
                    resize: 'none',
                    caretColor: 'plain.color',
                    padding: 0,
                    outline: 0,
                    border: 0,
                    height: '100%',
                    color: 'plain.color'
                  }}
                  defaultValue={JSON.stringify(queryVariables, null, 2)}
                  onChange={handleQueryVariables}
                />
              </Box>
              <Flex
                as='footer'
                sx={{
                  minHeight: '5%',
                  color: 'plain.color',
                  p: 3,
                  justifyContent: 'flex-end'
                }}
              >
                <Text sx={{ fontSize: 1 }}>v{pkg.version}</Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Container>
    </LiveProvider>
  )
}
