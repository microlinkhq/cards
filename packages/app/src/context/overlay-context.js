import { useCallback, useState } from 'react'
import defer from 'tickedoff'

const overlayContext = (onShow) => {
  const [isOverlay, setOverlay] = useState('')

  const showOverlay = useCallback(
    (state) => () => {
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

export default overlayContext
