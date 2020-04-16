import { HorizontalDragBar, VerticalDragBar } from '@/components/drag-bars'
import { Image, Button, Text, Box, Flex, useThemeUI } from 'theme-ui'
import SearchableSelect from '@/components/searchable-select'
import { marshall, unmarshall } from '@/lib/compress-json'
import useScreenshotUrl from '@/hooks/use-screenshot-url'
import useKeyBindings from '@/hooks/use-key-bindings'
import useQueryState from '@/hooks/use-query-state'
import GitHubIcon from '@/components/icons/github'
import aspectRatio from '@/lib/aspect-ratio-16-9'
import JSONViewer from '@/components/json-viewer'
import ButtonIcon from '@/components/button-icon'
import ThemeIcon from '@/components/icons/theme'
import InfoIcon from '@/components/icons/info'
import notification from '@/lib/notification'
import useLoading from '@/hooks/use-loading'
import presets from '@/components/presets'
import Overlay from '@/components/overlay'
import shareCode from '@/lib/share-code'
import Choose from '@/components/choose'
import { diff } from 'deep-object-diff'
import store from '@/lib/local-storage'
import clipboard from '@/lib/clipboard'
import debounce from '@/lib/debounce'
import Main from '@/components/main'
import Code from '@/components/code'
import isEmpty from '@/lib/is-empty'
import * as polished from 'polished'
import Router from 'next/router'
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

const OVERLAY_STATE = {
  PREVIEW: 'preview',
  INFO: 'info'
}

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
  const isLoading = useLoading()
  const [query, setQuery] = useQueryState()
  const { theme, colorMode, setColorMode } = useThemeUI()
  const [isOverlay, setOverlay] = useState('')
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
    return { ...preset.query, ...queryVariables }
  })

  const [screenshotUrl, syncScreenshotUrl] = useScreenshotUrl(queryVariables)

  const showOverlay = state => () => {
    syncScreenshotUrl(queryVariables)
    defer(() => setOverlay(state))
  }

  const hideOverlay = () => setOverlay('')

  async function toClipboard (text, name) {
    await clipboard.write(text)
    notification(`Copied ${name} to clipboard`)
  }

  const changeTheme = () => setColorMode(nextMode())

  useKeyBindings({
    Escape: { fn: hideOverlay },
    KeyI: { ctrl: true, fn: showOverlay(OVERLAY_STATE.INFO) },
    KeyT: { ctrl: true, fn: changeTheme },
    KeyS: { ctrl: true, fn: showOverlay(OVERLAY_STATE.PREVIEW) }
  })

  const handleCode = newCode => {
    setCode(newCode)
    updateQuery({ setQuery, code: newCode })
  }

  const handleQueryVariables = newJSON => {
    setQueryVariables(newJSON)
    updateQuery({ setQuery, queryVariables: diff(preset.query, newJSON) })
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
    setQuery({ p: undefined, preset: presetName }, { assign: false })
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

  const OverlayHeader = ({ sx, children }) => {
    return (
      <Box as='header' sx={{ position: 'sticky' }}>
        <Box
          sx={{
            display: 'flex',
            maxWidth: '100%',
            border: '1px solid',
            borderColor,
            ...sx
          }}
        >
          {children}
        </Box>
      </Box>
    )
  }

  const OverlayFooter = () => {
    return (
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
    )
  }

  const InfoOverlay = () => {
    return (
      <>
        <OverlayHeader>
          <Image
            src='https://cdn.microlink.io/banner/cards.png'
            alt='microlink cards'
          />
        </OverlayHeader>

        <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
          <b>Microlink Cards</b> generates social images on demand, ready to be
          embed in your{' '}
          <Text as='code' sx={{ fontFamily: 'mono' }}>
            &lt;meta&gt;
          </Text>{' '}
          tags.
        </Text>
        <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
          The tool is an interactive editor that allows generate your images
          writing them with code and feed with dynamic content.
        </Text>
        <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
          It's powered by{' '}
          <Text
            as='a'
            sx={{ textDecoration: 'none', color: stringColor }}
            href='https://microlink.io'
            target='_blank'
            rel='noopener noreferrer'
          >
            Microlink API
          </Text>
          , the fastest and scalable headless browser platform on the cloud.
        </Text>
        <Text sx={{ my: 3, fontSize: 2, fontWeight: 'normal' }}>
          It starts from <b>free</b> and code is available on{' '}
          <Text
            as='a'
            sx={{ textDecoration: 'none', color: stringColor }}
            href={pkg.homepage}
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </Text>
          .
        </Text>
        <OverlayFooter />
      </>
    )
  }

  const PreviewOverlay = () => {
    return (
      <>
        <OverlayHeader
          sx={{
            height: PREVIEW_HEIGHT
          }}
        >
          <LivePreview
            isThumbnail
            thumbnailHeight={`calc(${toPx(PREVIEW_HEIGHT)} + 2px)`}
            thumbnailWidth={`calc(${toPx(PREVIEW_WIDTH)} + 2px)`}
            onClick={() => toClipboard(screenshotUrl, 'URL')}
          />
        </OverlayHeader>

        <Text sx={{ color, my: 3, fontSize: 2, fontWeight: 'normal' }}>
          Add it to your website by copying the code below
        </Text>

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
                  onClick={e => toClipboard(e.target.textContent, 'SEO Tags')}
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
                  onClick={e => toClipboard(e.target.textContent, 'HTML')}
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
                  onClick={e => toClipboard(e.target.textContent, 'Markdown')}
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
                  onClick={e => toClipboard(e.target.textContent, 'URL')}
                />
              </Flex>
            </Flex>
          </Box>
        </Box>
        <OverlayFooter />
      </>
    )
  }

  return (
    <LiveProvider
      theme={editorTheme}
      queryVariables={queryVariables}
      code={code}
    >
      <Overlay
        aria-hidden={isOverlay === ''}
        backgroundColor={bg}
        color={color}
        isOpen={isOverlay !== ''}
        onClose={hideOverlay}
      >
        <Choose.When condition={isOverlay === OVERLAY_STATE.PREVIEW}>
          <PreviewOverlay />
        </Choose.When>
        <Choose.When condition={isOverlay === OVERLAY_STATE.INFO}>
          <InfoOverlay />
        </Choose.When>
      </Overlay>
      <Flex sx={{ bg: 'plain.backgroundColor', height: '100vh' }}>
        <Main>
          <LivePreview
            onClick={showOverlay(OVERLAY_STATE.PREVIEW)}
            isEditor={isEditor}
          />
          <LiveError />
        </Main>
        {isEditor && (
          <Flex
            as='aside'
            sx={{
              mt: 3,
              mb: 3,
              pl: 3,
              borderLeft: '1px solid',
              borderColor,
              bg: 'plain.backgroundColor',
              flexDirection: 'column',
              fontFamily: 'mono',
              fontSize: 2,
              fontWeight: 'light',
              height: 'calc(100vh - 32px)',
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
                py: 3,
                mr: 3,
                color: 'plain.color',
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
                <ButtonIcon
                  as='button'
                  title='README'
                  color={iconColor}
                  hoverColor={color}
                  onClick={showOverlay(OVERLAY_STATE.INFO)}
                >
                  <InfoIcon />
                </ButtonIcon>
                <Box sx={{ mx: 1 }}>
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
                  onClick={changeTheme}
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
                  borderColor,
                  p: 3,
                  mr: 3,
                  overflow: 'auto',
                  flex: 1
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
