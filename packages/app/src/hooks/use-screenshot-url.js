import { useState, useEffect, useCallback } from 'react'

import { getScreenshotUrl, isDev } from '@/lib'
import { DEFAULT_PRESET } from '@/constants'

const shortenUrl = isDev
  ? 'http://localhost:3000/?adblock=false&element=%23screenshot&embed=screenshot.url&meta=false&screenshot&waitUntil.0=load&waitUntil.1=networkidle0&url='
  : 'https://i.microlink.io/'

const getUrl = () => {
  const urlObj = new URL(window.location)
  urlObj.pathname = ''

  if (!urlObj.searchParams.has('preset')) {
    urlObj.searchParams.set('preset', DEFAULT_PRESET)
  }

  return urlObj.toString()
}

const getCardUrl = ({ endpoint, ...props }) => {
  if (!isDev && !endpoint) {
    return `${shortenUrl}${encodeURIComponent(getUrl())}`
  }

  return getScreenshotUrl(getUrl(), {
    force: !!isDev,
    endpoint: isDev ? 'http://localhost:3000' : endpoint,
    adblock: false,
    element: '#screenshot',
    embed: 'screenshot.url',
    meta: false,
    screenshot: true,
    'screenshot.type': props['screenshot.type']
  })
}

export const useScreenshotUrl = queryVariables => {
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [runDownload, setRunDownload] = useState(false)

  const sync = useCallback(
    queryVariables => setScreenshotUrl(getCardUrl(queryVariables)),
    []
  )

  const downloadScreenshot = useCallback(() => {
    sync(queryVariables)
    setRunDownload(true)
  }, [queryVariables, sync])

  useEffect(() => sync(queryVariables), [queryVariables, sync])

  useEffect(() => {
    if (runDownload) {
      setRunDownload(false)

      const link = document.createElement('a')
      link.download = Date.now()
      link.href = screenshotUrl

      window.open(link)
    }
  }, [runDownload, screenshotUrl])

  return [screenshotUrl, sync, downloadScreenshot]
}
