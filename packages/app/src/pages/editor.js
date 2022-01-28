import { useContext, useEffect, useState } from 'react'

import { Overlays, PreviewArea, Sidebar } from '@/containers'
import { AppFrame, presets, SeoMeta, Spinner, Script } from '@/components'
import { META, OVERLAY_STATE } from '@/constants'
import { useKeyBindings } from '@/hooks'
import { AppContext } from '@/context'
import { getPresetBySlug, getPresetSlug } from '@/lib'

export default function Editor ({ presetName, presetSlug }) {
  const [render, setRender] = useState(false)
  const {
    changeTheme,
    handlePresetChange,
    hideOverlay,
    presetRef,
    screenshotUrl,
    showOverlay,
    theme: { bg }
  } = useContext(AppContext)

  const name = !render ? presetName : presetRef.current.name
  const slug = !render ? presetSlug : getPresetSlug(name)
  const metaTitle = name ? `${name} – Presets – ${META.title}` : undefined
  const metaDescription = name ? `Customizable ${name} preset for Microlink Cards. ${META.description}` : undefined
  const metaUrl = slug ? `${META.url}/editor?preset=${slug}` : undefined
  const metaImage = slug ? `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3D${slug}` : (screenshotUrl || undefined)

  useKeyBindings({
    Escape: { fn: hideOverlay },
    KeyJ: { ctrl: true, fn: showOverlay(OVERLAY_STATE.KEYBINDINGS) },
    KeyK: { ctrl: true, fn: showOverlay(OVERLAY_STATE.ABOUT) },
    KeyP: { ctrl: true, fn: changeTheme },
    KeyS: { ctrl: true, fn: showOverlay(OVERLAY_STATE.PREVIEW) }
  })

  useEffect(() => {
    if (!render) {
      if (presetSlug) {
        handlePresetChange(presetSlug)
      }

      setRender(true)
    }
  }, [handlePresetChange, presetSlug, render])

  return (
    <>
      <SeoMeta
        description={metaDescription}
        image={metaImage}
        title={metaTitle}
        twitterCardType='summary_large_image'
        url={metaUrl}
      />
      {!render
        ? (
          <AppFrame>
            <Spinner />
          </AppFrame>
          )
        : (
          <>
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
          )}
    </>
  )
}

Editor.getInitialProps = (context) => {
  const slug = context.query.preset

  if (slug) {
    const preset = getPresetBySlug(presets, slug)

    if (preset) {
      return { presetSlug: slug, presetName: preset.name }
    }
  }

  return { presetSlug: undefined, presetName: undefined }
}
