import { useState, useEffect } from 'react'
import isSSR from '@/lib/is-ssr'

const getSize = isSSR
  ? () => ({})
  : () => ({ width: window.innerWidth, height: window.innerHeight })

export default () => {
  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (isSSR) return false
    const handleResize = () => setWindowSize(getSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
