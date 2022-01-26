import { useContext, useEffect, useState } from 'react'

import { Overlays, PreviewArea, Sidebar } from '@/containers'
import { AppFrame, SeoMeta, Spinner, Script } from '@/components'
import { META, OVERLAY_STATE } from '@/constants'
import { useKeyBindings } from '@/hooks'
import { AppContext } from '@/context'
import { getPresetSlug } from '@/lib'

export default function Editor () {
  const [render, setRender] = useState(false)
  const {
    changeTheme,
    hideOverlay,
    presetRef,
    screenshotUrl,
    showOverlay,
    theme: { bg }
  } = useContext(AppContext)

  useKeyBindings({
    Escape: { fn: hideOverlay },
    KeyJ: { ctrl: true, fn: showOverlay(OVERLAY_STATE.KEYBINDINGS) },
    KeyK: { ctrl: true, fn: showOverlay(OVERLAY_STATE.ABOUT) },
    KeyP: { ctrl: true, fn: changeTheme },
    KeyS: { ctrl: true, fn: showOverlay(OVERLAY_STATE.PREVIEW) }
  })

  useEffect(() => {
    setRender(true)
  }, [])

  if (!render) {
    return (
      <AppFrame>
        <Spinner />
      </AppFrame>
    )
  }

  const presetSlug = getPresetSlug(presetRef.current.name)
  const metaTitle = `${presetRef.current.name} – Presets – ${META.title}`
  const metaDescription = `Customizable ${presetRef.current.name} preset for Microlink Cards. ${META.description}`
  const metaUrl = `${META.url}/editor?preset=${presetSlug}`

  return (
    <>
      <SeoMeta
        description={metaDescription}
        image={screenshotUrl}
        title={metaTitle}
        twitterCardType='summary_large_image'
        url={metaUrl}
      />
      <AppFrame sx={{ bg }}>
        <PreviewArea isEditor />
        <Sidebar />
        <Script
          async
          crossOrigin='anonymous'
          src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver'
        />
      </AppFrame>
      <Overlays />
    </>
  )
}
