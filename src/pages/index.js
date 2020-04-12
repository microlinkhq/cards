import { HorizontalDragBar, VerticalDragBar } from '@/components/drag-bars'
import { marshall, unmarshall } from '@/lib/compress-json'
import useQueryState from '@/hooks/use-query-state'
import GitHubIcon from '@/components/icons/github'
import JSONViewer from '@/components/json-viewer'
import ThemeIcon from '@/components/icons/theme'
import screenshotUrl from '@/lib/screenshot-url'
import Container from '@/components/container'
import notification from '@/lib/notification'
import { useEffect, useState } from 'react'
import presets from '@/components/presets'
import store from '@/lib/local-storage'
import clipboard from '@/lib/clipboard'
import debounce from '@/lib/debounce'
import Main from '@/components/main'
import isEmpty from '@/lib/is-empty'
import onSave from '@/lib/on-save'
import Select from 'react-select'
import Router from 'next/router'
import themeBase from '@/theme'
import Cycled from 'cycled'

// import Overlay from '@/components/overlay'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@/components/live-editor'

import { Link as ExternalLink, Button, Box, Flex, useThemeUI } from 'theme-ui'

import pkg from '@/package.json'

const DEFAULT_PRESET = Object.keys(presets)[0]
const ASIDE_HEIGHT_KEY = 'sidebar-json-height'
const ASIDE_WIDTH_KEY = 'sidebar-width'
const DEFAULT_ASIDE_WIDTH = '30%'
const DEFAULT_ASIDE_HEIGHT = '25%'
const ASIDE_MIN_WIDTH = '20%'
const ASIDE_MAX_WIDTH = '60%'
const ASIDE_MIN_HEIGHT = '15%'
const ASIDE_MAX_HEIGHT = '70%'

const updateQuery = debounce(({ setQuery, code, queryVariables }) => {
  let newQuery = {}
  if (!isEmpty(code)) newQuery.p = marshall(code)
  if (!isEmpty(queryVariables)) newQuery = { ...newQuery, ...queryVariables }
  setQuery(newQuery)
})

const updateStore = debounce(({ key, value }) => store.set(key, value))

const cycledMode = new Cycled(Object.keys(themeBase.colors.modes))
const nextMode = () => cycledMode.next()

export default () => {
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [isLoading, setIsLoading] = useState(true)
  // const [isOverlayOpen, setOverlayOpen] = useState(false)

  const [asideWidth, setAsideWidth] = useState(
    store.get(ASIDE_WIDTH_KEY) || DEFAULT_ASIDE_WIDTH
  )

  const [jsonHeight, setJsonHeight] = useState(
    store.get(ASIDE_HEIGHT_KEY) || DEFAULT_ASIDE_HEIGHT
  )

  const [preset, setPreset] = useState(presets[query.preset || DEFAULT_PRESET])

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
    // setOverlayOpen(true)
    const url = screenshotUrl(
      decodeURI(window.location.href.replace('/editor/', ''))
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
    updateQuery({ setQuery, code: newCode })
  }

  const handleQueryVariables = newJSON => {
    setQueryVariables(newJSON)
    updateQuery({ setQuery, queryVariables: newJSON })
  }

  const handleAsideWidthReize = width => {
    setAsideWidth(width)
    updateStore({ key: ASIDE_WIDTH_KEY, value: width })
  }

  const handleAsideHeightResize = height => {
    setJsonHeight(height)
    updateStore({ key: ASIDE_HEIGHT_KEY, value: height })
  }

  const handleSelectChange = event => {
    const presetName = event.value
    const newPreset = presets[presetName]
    setPreset(newPreset)
    setCode(newPreset.code)
    setQueryVariables(newPreset.query)
    setQuery({ p: undefined, preset: presetName })
  }

  const handleChangeColor = () => {
    setColorMode(nextMode())
  }

  if (isLoading) return null

  const isEditor = Router.asPath.startsWith('/editor')
  const color = theme.colors.modes[colorMode].plain.color

  return (
    <LiveProvider
      theme={theme.colors.modes[colorMode]}
      queryVariables={queryVariables}
      code={code}
    >
      {/* <Overlay isOpen={isOverlayOpen}>
        <Text>Embed HTML</Text>
      </Overlay> */}
      <Container>
        <Main>
          <LivePreview onClick={toClipboard} isEditor={isEditor} />
          <LiveError />
        </Main>
        {isEditor && (
          <Flex
            as='aside'
            sx={{
              bg: 'plain.backgroundColor',
              flexDirection: 'column',
              fontFamily: 'mono',
              fontSize: 2,
              fontWeight: 'light',
              height: '100%',
              maxWidth: ASIDE_MAX_WIDTH,
              minWidth: ASIDE_MIN_WIDTH,
              position: 'relative',
              width: asideWidth,
              willChange: 'width'
            }}
          >
            <VerticalDragBar onDrag={handleAsideWidthReize} />

            <Flex
              as='header'
              sx={{
                alignItems: 'center',
                bg: 'plain.backgroundColor',
                borderBottom: '1px solid',
                borderColor: 'plain.color',
                color: 'plain.color',
                p: 3,
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  width: '200px'
                }}
              >
                <Select
                  value={{ value: preset.name, label: preset.name }}
                  options={Object.keys(presets).map(key => ({
                    value: key,
                    label: presets[key].name
                  }))}
                  onChange={handleSelectChange}
                />
              </Box>
              <Flex
                sx={{
                  alignItems: 'center'
                }}
              >
                <ExternalLink
                  href={pkg.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  title='See on GitHub'
                  sx={{
                    bg: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    outline: 0,
                    p: 0
                  }}
                >
                  <GitHubIcon color={color} />
                </ExternalLink>
                <Button
                  title='Change color mode'
                  sx={{
                    bg: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    ml: 2,
                    outline: 0,
                    p: 0
                  }}
                  onClick={handleChangeColor}
                >
                  <ThemeIcon color={color} />
                </Button>
              </Flex>
            </Flex>
            <Flex sx={{ flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <Box as='section' sx={{ flex: 1, p: 3, overflow: 'auto' }}>
                <LiveEditor onChange={handleCode} />
              </Box>
              <Box
                sx={{
                  height: jsonHeight,
                  maxHeight: ASIDE_MAX_HEIGHT,
                  minHeight: ASIDE_MIN_HEIGHT,
                  position: 'relative',
                  willChange: 'height'
                }}
              >
                <HorizontalDragBar onDrag={handleAsideHeightResize} />
                <Box
                  as='section'
                  sx={{
                    bg: 'plain.backgroundColor',
                    borderColor: 'plain.color',
                    borderTop: '1px solid',
                    overflow: 'scroll',
                    p: 3
                  }}
                >
                  <JSONViewer
                    children={queryVariables}
                    onChange={handleQueryVariables}
                  />
                </Box>
              </Box>
            </Flex>
          </Flex>
        )}
      </Container>
    </LiveProvider>
  )
}
