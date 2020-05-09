import { useState, useEffect } from 'react'
import Router from 'next/router'

import { isEditor } from '@/lib'

const isCtrl = e => e.metaKey || e.ctrlKey

// https://keycode.info
export const useKeyBindings = (initialKeyBindings = {}, eventListener = 'keydown') => {
  const [keyBindings] = useState(initialKeyBindings)

  useEffect(() => {
    if (!isEditor(Router)) return

    document.addEventListener(
      eventListener,
      event => {
        const { code } = event
        const keyBinding = keyBindings[code]
        if (keyBinding === undefined) return
        const condition = keyBinding.ctrl ? isCtrl(event) : true
        if (!condition) return
        event.preventDefault()
        keyBinding.fn(event)
      },
      false
    )

    return () =>
      Object.keys(keyBindings).forEach(keyBinding =>
        document.removeEventListener(eventListener, keyBindings[keyBinding])
      )
  }, [])
}
