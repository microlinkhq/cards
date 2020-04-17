import getScreenshotUrl from '@/lib/screenshot-url'
import { useState, useEffect } from 'react'
import isDev from '@/lib/is-dev'

const shortenUrl = isDev
  ? 'http://localhost:3000/?adblock=false&element=%23screenshot&embed=screenshot.url&meta=false&screenshot&waitUntil.0=load&waitUntil.1=networkidle0&url='
  : 'https://i.microlink.io/'

const getUrl = () => {
  const urlObj = new URL(window.location)
  urlObj.pathname = ''
  return urlObj.toString()
}

const getCardUrl = ({ queryVariables }) => {
  const { endpoint } = queryVariables
  if (!endpoint) return shortenUrl + encodeURIComponent(getUrl())
  return getScreenshotUrl(getUrl(), {
    endpoint: endpoint,
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
