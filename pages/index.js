import { Button, Textarea, Select, Box, Flex, useThemeUI } from 'theme-ui'
import { marshall, unmarshall } from '@lib/compress-json'
import presets from '@components/presets'
import useQueryState from '@hooks/use-query-state'
import React, { useState, useEffect } from 'react'
import ThemeIcon from '@components/icons/theme'
import notification from '@lib/notification'
import { getApiUrl } from '@microlink/mql'
import styled from 'styled-components'
import clipboard from '@lib/clipboard'
import themeBase from '@themes/base'
import debounce from '@lib/debounce'
import isEmpty from '@lib/is-empty'
import onSave from '@lib/on-save'
import Main from '@components/main'
import Router from 'next/router'
import Cycled from 'cycled'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@components/live-editor'

const DEFAULT_PRESET = Object.keys(presets)[0]

const Container = styled(Flex)`
  height: 100vh;
`

const updateUrl = debounce(({ setQuery, code, queryVariables }) => {
  let newQuery = {}
  if (!isEmpty(code)) newQuery.p = marshall(code)
  if (!isEmpty(queryVariables)) newQuery = { ...newQuery, ...queryVariables }
  setQuery(newQuery)
})

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

export default () => {
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [isLoading, setIsLoading] = useState(true)

  const [preset, setPreset] = useState(() => {
    const presetName = query.preset || DEFAULT_PRESET
    return presets[presetName]
  })

  const [code, setCode] = useState(() => {
    if (isEmpty(query)) return preset.code
    const { p } = query
    if (isEmpty(p)) return preset.code
    return unmarshall(p)
  })

  const [queryVariables, setQueryVariables] = useState(() => {
    if (isEmpty(query)) return preset.query
    const { p, preset: queryPreset, ...queryVariables } = query
    if (isEmpty(queryVariables)) return preset.query
    return queryVariables
  })

  const toClipboard = async () => {
    const [url] = getApiUrl(
      decodeURI(window.location.href.replace('/editor/', '')),
      {
        meta: false,
        screenshot: true,
        embed: 'screenshot.url',
        element: '#screenshot',
        waitUntil: ['load', 'networkidle0']
      }
    )
    await Promise.all([clipboard.write(url)])
    notification('Copied URL to clipboard')
  }

  useEffect(() => {
    if (Router.asPath === '/' && isEmpty(Router.query)) {
      return Router.push({ pathname: '/editor' })
    }
    onSave(toClipboard)
    setIsLoading(false)
  }, [])

  const handleCode = newCode => {
    setCode(newCode)
    updateUrl({ setQuery, code: newCode })
  }

  const handleQueryVariables = event => {
    const payload = event.target.value
    try {
      const json = JSON.parse(payload)
      setQueryVariables(json)
      updateUrl({ setQuery, queryVariables: json })
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
          <LivePreview onClick={toClipboard} isEditor={isEditor} />
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
                <Select
                  defaultValue={preset.name}
                  sx={{
                    fontSize: 1,
                    width: '8rem',
                    p: '2px 8px'
                  }}
                  onChange={e => {
                    const presetName = e.currentTarget.value
                    const newPreset = presets[presetName]
                    setPreset(newPreset)
                    setCode(newPreset.code)
                    setQueryVariables(newPreset.query)
                    setQuery({ p: undefined, preset: presetName })
                  }}
                >
                  {Object.keys(presets).map(presetName => (
                    <option
                      key={presetName}
                      value={presetName}
                      children={presetName}
                    />
                  ))}
                </Select>
              </Flex>
              <Button
                title='Change color mode'
                sx={{
                  outline: 0,
                  cursor: 'pointer',
                  bg: 'transparent'
                }}
                onClick={() => setColorMode(nextMode())}
              >
                <ThemeIcon color={theme.colors.modes[colorMode].plain.color} />
              </Button>
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
                  value={JSON.stringify(queryVariables, null, 2)}
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
