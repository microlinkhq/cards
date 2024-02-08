import { useState, useEffect, useCallback } from 'react'

import { getScreenshotUrl, isDev } from '@/lib'
import { DEFAULT_PRESET } from '@/constants'

const getUrl = () => {
  const urlObj = new URL(window.location)
  urlObj.pathname = ''

  if (!urlObj.searchParams.has('preset')) {
    urlObj.searchParams.set('preset', DEFAULT_PRESET)
  }

  return urlObj.toString()
}

const getCardUrl = ({ endpoint, ...props }) => {
  return getScreenshotUrl(getUrl(), {
    force: !!isDev,
    endpoint: isDev ? 'http://localhost:3000' : endpoint,
    adblock: false,
    screenshot: { element: '#screenshot', type: props['screenshot.type'] },
    embed: 'screenshot.url',
    meta: false,
    waitUntil: ['load', 'networkidle0']
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
