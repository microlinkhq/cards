import getScreenshotUrl from '@/lib/screenshot-url'
import { useState, useEffect } from 'react'
import isDev from '@/lib/is-dev'

const getRootUrl = () => {
  const urlObj = new URL(window.location)
  urlObj.pathname = ''
  return decodeURIComponent(urlObj.toString())
}

export default queryVariables => {
  const [screenshotUrl, setScreenshotUrl] = useState('')

  const sync = queryVariables => {
    const url = getRootUrl()
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
