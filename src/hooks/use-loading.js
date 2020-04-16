import { useState, useEffect } from 'react'
import isEmpty from '@/lib/is-empty'
import Router from 'next/router'

export default () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (Router.asPath === '/' && isEmpty(Router.query)) {
      return Router.push('/editor', '/editor', { shallow: true })
    }
    setIsLoading(false)
  }, [])

  return isLoading
}
