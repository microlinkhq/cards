import { useState, useEffect } from 'react'
import Router from 'next/router'

const isCtrl = e => e.ctrlKey

// https://keycode.info
export default (initialKeyBindings = {}, eventListener = 'keydown') => {
  const [keyBindings] = useState(initialKeyBindings)

  useEffect(() => {
    const isEditor = Router.asPath.startsWith('/editor')
    if (!isEditor) return

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
