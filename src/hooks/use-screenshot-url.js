import getScreenshotUrl from '@/lib/screenshot-url'
import { useState, useEffect } from 'react'
import isDev from '@/lib/is-dev'

export default queryVariables => {
  const [screenshotUrl, setScreenshotUrl] = useState('')

  const sync = queryVariables => {
    const urlObj = new URL(window.location)
    urlObj.pathname = ''
    const url = decodeURI(urlObj.toString())

    setScreenshotUrl(
      getScreenshotUrl(url, {
        endpoint: isDev ? 'http://localhost:3000' : queryVariables.endpoint,
        force: !!isDev
      })
    )
  }

  useEffect(() => sync(queryVariables), [])

  return [screenshotUrl, sync]
}
