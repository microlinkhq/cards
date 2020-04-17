import getScreenshotUrl from '@/lib/screenshot-url'
import { useState, useEffect } from 'react'
import isDev from '@/lib/is-dev'

const getUrl = () => {
  const urlObj = new URL(window.location)
  urlObj.pathname = ''
  return urlObj.toString()
}

const getCardUrl = ({ query, queryVariables }) => {
  const { endpoint } = queryVariables
  if (!endpoint && !isDev) {
    const str = Object.keys(query).reduce((acc, key, index) => {
      acc = `${acc}${index === 0 ? '' : '&'}${key}=${query[key]}`
      return acc
    }, '')
    return `https://i.microlink.io/${encodeURIComponent(str)}`
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
