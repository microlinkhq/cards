import { useState, useEffect } from 'react'
import isMac from '@/lib/is-mac'

const isCtrl = e => (isMac ? e.metaKey : e.ctrlKey)

// https://keycode.info
export default (initialKeyBindings = {}, eventListener = 'keydown') => {
  const [keyBindings] = useState(initialKeyBindings)

  useEffect(() => {
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
