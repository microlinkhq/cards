import { useState, useEffect } from 'react'

// https://keycode.info
export default (initialKeyBindings = {}, eventListener = 'keydown') => {
  const [keyBindings] = useState(initialKeyBindings)

  useEffect(() => {
    document.addEventListener(
      eventListener,
      event => {
        const { code } = event
        console.log(code, keyBindings)
        const keyBinding = keyBindings[code]
        if (keyBinding) {
          event.preventDefault()
          keyBinding(event)
        }
      },
      false
    )

    return () =>
      Object.keys(keyBindings).forEach(keyBinding =>
        document.removeEventListener(eventListener, keyBindings[keyBinding])
      )
  }, [])
}
