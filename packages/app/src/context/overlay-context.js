import { useCallback, useState } from 'react'
import defer from 'tickedoff'

export default function OverlayContext (onShow) {
  const [isOverlay, setOverlay] = useState('')

  const showOverlay = useCallback(
    state => () => {
      if (onShow) {
        onShow()
      }

      defer(() => setOverlay(state))
    },
    [onShow]
  )

  const hideOverlay = useCallback(() => setOverlay(''), [])

  return { isOverlay, showOverlay, hideOverlay }
}
