import { useState, createElement, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Image } from 'theme-ui'
import noop from '@/lib/noop'

const Placeholder = ({ sx, theme, ...props }) => (
  <SkeletonTheme {...theme}>
    <Skeleton {...sx} {...props} />
  </SkeletonTheme>
)

const LazyImage = ({ onError, ...props }) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const img = document.createElement('img')
    img.onerror = onError
    img.onload = () => {
      img.onload = null
      img.onerror = null
      setLoading(false)
    }
    img.src = props.src
  }, [])

  const Component = isLoading ? Placeholder : Image
  return createElement(Component, props)
}

LazyImage.defaultProps = {
  onError: noop
}

export default LazyImage
