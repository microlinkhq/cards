import { useMemo, useContext } from 'react'
import { Flex } from 'theme-ui'
import { useRouter } from 'next/router'

import { Overlays, PreviewArea, Sidebar } from '@/containers'
import { useKeyBindings, useLoading } from '@/hooks'
import { setImageMeta } from '@/lib'
import { OVERLAY_STATE } from '@/constants'
import AppContextProvider, { AppContext } from '@/context'

const Editor = () => {
  const isLoading = useLoading()
  const { asPath } = useRouter()

  const {
    changeTheme,
    hideOverlay,
    screenshotUrl,
    showOverlay,
    theme: { bg }
  } = useContext(AppContext)

  const isEditor = useMemo(() => asPath.startsWith('/editor'), [asPath])

  setImageMeta(screenshotUrl)

  useKeyBindings({
    Escape: { fn: hideOverlay },
    KeyJ: { ctrl: true, fn: showOverlay(OVERLAY_STATE.KEYBINDINGS) },
    KeyK: { ctrl: true, fn: showOverlay(OVERLAY_STATE.ABOUT) },
    KeyP: { ctrl: true, fn: changeTheme },
    KeyS: { ctrl: true, fn: showOverlay(OVERLAY_STATE.PREVIEW) }
  })

  if (isLoading) return null

  return (
    <>
      <Flex sx={{ bg, height: '100vh' }}>
        <PreviewArea isEditor={isEditor} />

        {isEditor && <Sidebar />}
      </Flex>

      <Overlays />
    </>
  )
}

export default () => (
  <AppContextProvider>
    <Editor />
  </AppContextProvider>
)
