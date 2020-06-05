import { useContext, useEffect, useState } from 'react'

import { Overlays, PreviewArea, Sidebar } from '@/containers'
import { AppFrame, Spinner } from '@/components'
import { useKeyBindings } from '@/hooks'
import { setImageMeta } from '@/lib'
import { OVERLAY_STATE } from '@/constants'
import { AppContext } from '@/context'

const addCmdClassName = (e) =>
  e.metaKey && document.body.classList.add('cmd-pressed')

const removeCmdClassName = () => document.body.classList.remove('cmd-pressed')

export default function Editor () {
  const [render, setRender] = useState(false)
  const {
    changeTheme,
    hideOverlay,
    screenshotUrl,
    showOverlay,
    theme: { bg }
  } = useContext(AppContext)

  setImageMeta(screenshotUrl)

  useKeyBindings({
    Escape: { fn: hideOverlay },
    KeyJ: { ctrl: true, fn: showOverlay(OVERLAY_STATE.KEYBINDINGS) },
    KeyK: { ctrl: true, fn: showOverlay(OVERLAY_STATE.ABOUT) },
    KeyP: { ctrl: true, fn: changeTheme },
    KeyS: { ctrl: true, fn: showOverlay(OVERLAY_STATE.PREVIEW) }
  })

  useEffect(() => {
    setRender(true)

    document.addEventListener('keydown', addCmdClassName)
    document.addEventListener('keyup', removeCmdClassName)

    return () => {
      document.removeEventListener('keydown', addCmdClassName)
      document.removeEventListener('keyup', removeCmdClassName)
    }
  }, [])

  if (!render) {
    return (
      <AppFrame>
        <Spinner />
      </AppFrame>
    )
  }

  return (
    <>
      <AppFrame sx={{ bg }}>
        <PreviewArea isEditor />

        <Sidebar />
      </AppFrame>

      <Overlays />
    </>
  )
}
