import { useEffect } from 'react'

export default props => {
  useEffect(() => {
    const link = document.createElement('link')
    Object.keys(props).forEach(key => (link[key] = props[key]))
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])
  return false
}
