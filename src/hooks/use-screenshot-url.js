import getScreenshotUrl from '@/lib/screenshot-url'
import { useState, useEffect } from 'react'
import isDev from '@/lib/is-dev'
import { encode } from 'qss'

const getRootUrl = () => {
  const urlObj = new URL(window.location)
  urlObj.pathname = ''
  return decodeURIComponent(urlObj.toString())
}

const getCardUrl = ({ query, queryVariables }) => {
  const { endpoint } = queryVariables
  if (!endpoint && !isDev) return `https://i.microlink.io/${encode(query)}`
  return getScreenshotUrl(getRootUrl(), {
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
