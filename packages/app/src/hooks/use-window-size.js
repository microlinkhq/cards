import { useState, useLayoutEffect } from 'react'

const DEFAULT_SIZE = { width: 0, height: 0 }

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(DEFAULT_SIZE)

  useLayoutEffect(() => {
    setWindowSize(getSize())

    const handleResize = () => setWindowSize(getSize())
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
