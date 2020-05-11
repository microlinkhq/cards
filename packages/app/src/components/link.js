import { useEffect } from 'react'

export const Link = props => {
  useEffect(() => {
    const link = document.createElement('link')
    Object.keys(props).forEach(key => (link[key] = props[key]))
    document.head.appendChild(link)
  }, [])
  return false
}
