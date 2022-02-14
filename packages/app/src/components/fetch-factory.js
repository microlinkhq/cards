import { useState, useEffect } from 'react'

import { useMountedRef } from '@/hooks'

export const FetchFactory = ({ cache, children, func, options, promiseHandler, url } = {}) => {
  const [result, setResult] = useState(null)
  const isMounted = useMountedRef()

  useEffect(() => {
    async function fetchData () {
      const id = JSON.stringify({ url, ...options })

      let promise = cache.get(id)

      if (!promise) {
        promise = func(url, options)
        cache.set(id, promise)
      }

      const result = await promiseHandler(promise)
      if (isMounted.current) setResult(result)
    }

    fetchData()
  }, [cache, func, isMounted, url, options, promiseHandler])

  return children(result)
}

FetchFactory.defaultProps = {
  promiseHandler: promise => promise
}
