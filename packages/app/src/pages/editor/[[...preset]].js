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

  const meta = {
    title: name ? `${name} — ${META.title}` : undefined,
    url: slug ? `${META.url}/editor?preset=${slug}` : undefined,
    image: !render && slug ? `${META.url}/preview/${slug}.png` : screenshotUrl || undefined
  }

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
        twitterCardType='summary_large_image' {...meta}
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

export async function getStaticProps (ctx) {
  if (ctx.params?.preset?.length) {
    const slug = ctx.params?.preset[1]
    const preset = getPresetBySlug(presets, slug)

    return { props: { presetSlug: slug, presetName: preset.name } }
  }

  return { props: {} }
}

export async function getStaticPaths () {
  const basePath = { params: { preset: [] } } // `/editor`

  // `/editor/preset/{slug}` paths
  const paths = Object.values(presets).map(({ name }) => ({
    params: { preset: ['preset', getPresetSlug(name)] }
  }))

  return { paths: [basePath, ...paths], fallback: false }
}
