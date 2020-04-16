import { useState, useEffect } from 'react'
import isEmpty from '@/lib/is-empty'
import Router from 'next/router'
import defer from 'tickedoff'

export default () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (Router.asPath === '/' && isEmpty(Router.query)) {
      return Router.push({ pathname: '/editor' })
    }
    setIsLoading(false)
    // defer(() => setIsLoading(false))
  }, [])

  return isLoading
}
