import getScreenshotUrl from '@/lib/screenshot-url'
import { useState, useEffect } from 'react'
import isDev from '@/lib/is-dev'

const getUrl = () => {
  const urlObj = new URL(window.location)
  urlObj.pathname = ''
  return urlObj.toString()
}

const getCardUrl = ({ queryVariables }) => {
  const { endpoint } = queryVariables
  if (!isDev && !endpoint) {
    return `https://i.microlink.io/${encodeURIComponent(getUrl())}`
  }

  return getScreenshotUrl(getUrl(), {
    force: !!isDev,
    endpoint: endpoint || 'http://localhost:3000',
    adblock: false,
    element: '#screenshot',
    embed: 'screenshot.url',
    meta: false,
    screenshot: true,
    waitUntil: ['load', 'networkidle0']
  })
}

export default opts => {
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const sync = opts => setScreenshotUrl(getCardUrl(opts))
  useEffect(() => sync(opts), [])
  return [screenshotUrl, sync]
}
