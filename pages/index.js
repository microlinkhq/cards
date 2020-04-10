import {
  Textarea,
  Text,
  Select,
  Box,
  Flex,
  useThemeUI
} from 'theme-ui'
import { marshall, unmarshall } from '@lib/compress-json'
import * as templates from '@components/templates'
import useQueryState from '@hooks/use-query-state'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import debounce from '@lib/debounce'
import themeBase from '@themes/base'
import Router from 'next/router'
import isEmpty from '@lib/is-empty'
import Main from '@components/main'
import decamelize from 'decamelize'

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
    if (Router.asPath === '/' && isEmpty(Router.query)) {
      return Router.push({ pathname: '/editor' })
    }

    if (!isEmpty(query)) {
      const { p, ...queryVariables } = query
      setQueryVariables({ ...DEFAULT_QUERY_VARIABLES, ...queryVariables })
      if (p) setCode(unmarshall(p))
    }
    setIsLoading(false)
  }, [])

  const handleCode = (newCode) => {
    setCode(newCode)
    updateUrl({ setQuery, code, queryVariables })
  }

  const handleQueryVariables = (event) => {
    const payload = event.target.value
    try {
      const json = JSON.parse(payload)
      setQueryVariables(json)
      updateUrl({ setQuery, code, queryVariables: json })
    } catch (_) {}
  }

  if (isLoading) return null
  const isEditor = Router.asPath.startsWith('/editor')

  return (
    <LiveProvider
      theme={theme.colors.modes[colorMode]}
      queryVariables={queryVariables}
      code={code}
    >
      <Container>
        <Main>
          <LivePreview isEditor={isEditor} />
          <LiveError />
        </Main>
        {isEditor && (
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
                alignItems: 'center'
              }}
            >
              <Flex
                sx={{
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <div style={{ marginRight: 10 }}>
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
                </div>
                <Select
                  defaultValue={decamelize(colorMode, ' ')}
                  sx={{
                    fontSize: 1,
                    width: '8rem',
                    p: '2px 8px'
                  }}
                  onChange={(e) => setColorMode(e.currentTarget.value)}
                >
                  {Object.keys(themeBase.colors.modes).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Text sx={{ fontSize: 1 }}>v{pkg.version}</Text>
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
                    p: 3,
                    outline: 0,
                    border: 0,
                    height: '100%',
                    color: 'plain.color'
                  }}
                  defaultValue={JSON.stringify(queryVariables, null, 2)}
                  onChange={handleQueryVariables}
                />
              </Box>
            </Flex>
          </Flex>
        )}
      </Container>
    </LiveProvider>
  )
}
