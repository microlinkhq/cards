import { useContext, useEffect, useState } from 'react'

import { AppFrame, presets, Meta, Spinner, Script } from '@/components'
import { Overlays, PreviewArea, Sidebar } from '@/containers'
import { getPresetBySlug, getPresetSlug } from '@/lib'
import { META, OVERLAY_STATE } from '@/constants'
import { useKeyBindings } from '@/hooks'
import { AppContext } from '@/context'

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

  const name = render ? presetRef.current.name : presetName
  const slug = render ? getPresetSlug(name) : presetSlug

  const meta = render
    ? {
        title: `${name} — ${META.title}`,
        url: `${META.url}/editor?preset=${slug}`,
        image: slug
          ? `${META.url}/preview/${slug}.png`
          : screenshotUrl || undefined
      }
    : undefined

  useKeyBindings({
    Escape: { fn: hideOverlay },
    KeyJ: { ctrl: true, fn: showOverlay(OVERLAY_STATE.KEYBINDINGS) },
    KeyK: { ctrl: true, fn: showOverlay(OVERLAY_STATE.ABOUT) },
    KeyP: { ctrl: true, fn: changeTheme },
    KeyS: { ctrl: true, fn: showOverlay(OVERLAY_STATE.PREVIEW) }
  })

  useEffect(() => {
    if (!render) {
      if (presetSlug) handlePresetChange(presetSlug)
      setRender(true)
    }
  }, [handlePresetChange, presetSlug, render])

  return (
    <>
      <Meta twitterCardType='summary_large_image' {...meta} />
      {!render ? (
        <AppFrame>
          <Spinner />
        </AppFrame>
      ) : (
        <>
          <AppFrame sx={{ bg }}>
            <PreviewArea isEditor />
            {/* <Sidebar /> */}
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
