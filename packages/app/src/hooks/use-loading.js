import { useState, useEffect } from 'react'
import Router from 'next/router'

import { isEditor, isEmpty } from '@/lib'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isEditor(Router) && isEmpty(Router.query)) {
      return Router.push('/editor', '/editor', { shallow: true })
    }
    setIsLoading(false)
  }, [])

  return isLoading
}
