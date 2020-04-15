import { HorizontalDragBar, VerticalDragBar } from '@/components/drag-bars'
import { Button, Text, Box, Flex, useThemeUI } from 'theme-ui'
import SearchableSelect from '@/components/searchable-select'
import { marshall, unmarshall } from '@/lib/compress-json'
import useKeyBindings from '@/hooks/use-key-bindings'
import getScreenshotUrl from '@/lib/screenshot-url'
import useQueryState from '@/hooks/use-query-state'
import GitHubIcon from '@/components/icons/github'
import aspectRatio from '@/lib/aspect-ratio-16-9'
import JSONViewer from '@/components/json-viewer'
import ButtonIcon from '@/components/button-icon'
import ThemeIcon from '@/components/icons/theme'
// import LazyImage from '@/components/lazy-image'
// import InfoIcon from '@/components/icons/info'
import notification from '@/lib/notification'
import useLoading from '@/hooks/use-loading'
import presets from '@/components/presets'
import Overlay from '@/components/overlay'
import shareCode from '@/lib/share-code'
import store from '@/lib/local-storage'
import clipboard from '@/lib/clipboard'
import debounce from '@/lib/debounce'
import Main from '@/components/main'
import Code from '@/components/code'
import isEmpty from '@/lib/is-empty'
import * as polished from 'polished'
import Router from 'next/router'
import isDev from '@/lib/is-dev'
import isSSR from '@/lib/is-ssr'
import { useState } from 'react'
import themeBase from '@/theme'
import toPx from '@/lib/to-px'
import defer from 'tickedoff'
import Cycled from 'cycled'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from '@/components/live-editor'

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

const PREVIEW_WIDTH = 500
const PREVIEW_HEIGHT = aspectRatio(PREVIEW_WIDTH)

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
  const [isOverlayOpen, setOverlayOpen] = useState(false)
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

  const isLoading = useLoading(() => {
    if (Router.asPath === '/' && isEmpty(Router.query)) {
      return Router.push({ pathname: '/editor' })
    }
  })

  const getURL = () => {
    if (isSSR) return
    return getScreenshotUrl(
      decodeURI(window.location.href.replace('/editor/', '')),
      {
        endpoint: isDev ? 'http://localhost:3000' : queryVariables.endpoint
      }
    )
  }

  const [screenshotUrl, setScreenshotUrl] = useState(getURL)

  const showOverlay = () => {
    setScreenshotUrl(getURL())
    defer(() => setOverlayOpen(true))
  }

  const hideOverlay = () => {
    setOverlayOpen(false)
  }

  async function toClipboard (text, name) {
    await clipboard.write(text)
    notification(`Copied ${name} to clipboard`)
  }

  useKeyBindings({
    Escape: hideOverlay,
    KeyS: showOverlay
  })

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

  if (isLoading) return null

  const isEditor = Router.asPath.startsWith('/editor')
  const editorTheme = theme.colors.modes[colorMode]
  const color = editorTheme.plain.color
  const bg = editorTheme.plain.backgroundColor
  const borderColor = polished.rgba(color, 0.1)
  const iconColor = polished.rgba(color, 0.75)

  const stringColor = theme.colors.styles.find(item =>
    item.types.includes('string')
  ).style.color

  return (
    <LiveProvider
      theme={editorTheme}
      queryVariables={queryVariables}
      code={code}
    >
      <Overlay
        aria-hidden={!isOverlayOpen}
        backgroundColor={bg}
        color={color}
        isOpen={isOverlayOpen}
        onClose={hideOverlay}
      >
        <Box as='header' sx={{ position: 'sticky' }}>
          <Box
            sx={{
              border: '1px solid',
              height: `calc(${toPx(PREVIEW_HEIGHT)} + 2px)`,
              width: `calc(${toPx(PREVIEW_WIDTH)} + 2px)`,
              borderColor
            }}
          >
            <LivePreview
              isThumbnail
              thumbnailHeight={`calc(${toPx(PREVIEW_HEIGHT)} + 2px)`}
              thumbnailWidth={`calc(${toPx(PREVIEW_WIDTH)} + 2px)`}
            />
            {/* <LazyImage
              theme={{
                color: polished.lighten(0.05, bg),
                highlightColor: polished.lighten(0.08, bg)
              }}
              sx={{
                objectFit: 'cover',
                height: toPx(PREVIEW_HEIGHT),
                width: toPx(PREVIEW_WIDTH)
              }}
              src={screenshotUrl}
            /> */}
          </Box>
          <Text sx={{ mt: 3, mb: 3, fontSize: 2, fontWeight: 'normal' }}>
            Add it to your website by copying the code below
          </Text>
        </Box>

        <Box as='section' sx={{ overflow: 'scroll' }}>
          <Box>
            <Flex
              sx={{
                flexDirection: 'column'
              }}
            >
              <Text
                sx={{ mt: 2, mb: 3, color, fontSize: 2, fontWeight: 'bold' }}
              >
                SEO tags
              </Text>
              <Flex>
                <Code
                  sx={{
                    borderColor,
                    color: stringColor
                  }}
                  onClick={event =>
                    toClipboard(event.target.textContent, 'SEO Tags')}
                  children={shareCode(screenshotUrl)}
                />
              </Flex>
            </Flex>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Flex
              sx={{
                mt: 3,
                flexDirection: 'column'
              }}
            >
              <Text
                sx={{ mt: 2, mb: 3, color, fontSize: 2, fontWeight: 'bold' }}
              >
                HTML
              </Text>
              <Flex>
                <Code
                  sx={{
                    borderColor,
                    color: stringColor
                  }}
                  children={`<img src="${screenshotUrl}" alt="Generated by https://cards.microlink.io">`}
                  onClick={event =>
                    toClipboard(event.target.textContent, 'HTML')}
                />
              </Flex>
            </Flex>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Flex
              sx={{
                mt: 3,
                flexDirection: 'column'
              }}
            >
              <Text
                sx={{ mt: 2, mb: 3, color, fontSize: 2, fontWeight: 'bold' }}
              >
                Markdown
              </Text>
              <Flex>
                <Code
                  sx={{
                    borderColor,
                    color: stringColor
                  }}
                  children={`![Generated by https://cards.microlink.io](${screenshotUrl})`}
                  onClick={event =>
                    toClipboard(event.target.textContent, 'Markdown')}
                />
              </Flex>
            </Flex>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Flex
              sx={{
                mt: 3,
                flexDirection: 'column'
              }}
            >
              <Text
                sx={{ mt: 2, mb: 3, color, fontSize: 2, fontWeight: 'bold' }}
              >
                Direct URL
              </Text>
              <Flex>
                <Code
                  sx={{
                    borderColor,
                    color: stringColor
                  }}
                  children={screenshotUrl}
                  onClick={event =>
                    toClipboard(event.target.textContent, 'URL')}
                />
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Flex as='footer' sx={{ justifyContent: 'flex-end', pt: 4 }}>
          <Button
            sx={{
              cursor: 'pointer',
              outline: 0,
              borderRadius: 2,
              bg: color,
              color: bg
            }}
            onClick={hideOverlay}
          >
            <Text>Got it</Text>
          </Button>
        </Flex>
      </Overlay>
      <Flex sx={{ bg: 'plain.backgroundColor', height: '100vh' }}>
        <Main>
          <LivePreview onClick={showOverlay} isEditor={isEditor} />
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
                borderColor,
                color: 'plain.color',
                py: 3,
                mr: 3,
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  width: '200px'
                }}
              >
                <SearchableSelect
                  color={color}
                  bg={bg}
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
                {/* <ButtonIcon
                  as='a'
                  href={pkg.homepage}
                  target='_blank'
                  rel='noopener noreferrer'
                  title='See on GitHub'
                  color={borderColor}
                  hoverColor={color}
                >
                  <InfoIcon />
                </ButtonIcon> */}
                <Box sx={{ pl: '6px', pr: '4px' }}>
                  <ButtonIcon
                    as='a'
                    href={pkg.homepage}
                    target='_blank'
                    rel='noopener noreferrer'
                    title='See on GitHub'
                    color={iconColor}
                    hoverColor={color}
                  >
                    <GitHubIcon />
                  </ButtonIcon>
                </Box>
                <ButtonIcon
                  as='button'
                  title='Change color mode'
                  onClick={() => setColorMode(nextMode())}
                  color={iconColor}
                  hoverColor={color}
                >
                  <ThemeIcon />
                </ButtonIcon>
              </Flex>
            </Flex>
            <Flex sx={{ flex: 1, minHeight: 0, flexDirection: 'column' }}>
              <Box
                as='section'
                sx={{
                  borderBottom: '1px solid',
                  overflow: 'auto',
                  borderColor,
                  flex: 1,
                  p: 3
                }}
              >
                <LiveEditor onChange={handleCode} />
              </Box>
              <Box
                sx={{
                  height: jsonHeight,
                  maxHeight: ASIDE_MAX_HEIGHT,
                  minHeight: ASIDE_MIN_HEIGHT,
                  position: 'relative',
                  willChange: 'height',
                  overflow: 'auto'
                }}
              >
                <HorizontalDragBar onDrag={handleAsideHeightResize} />
                <Box
                  as='section'
                  sx={{
                    bg: 'plain.backgroundColor',
                    py: 3,
                    mr: 3
                  }}
                >
                  <JSONViewer
                    theme={editorTheme}
                    children={queryVariables}
                    onChange={handleQueryVariables}
                  />
                </Box>
              </Box>
            </Flex>
          </Flex>
        )}
      </Flex>
    </LiveProvider>
  )
}
