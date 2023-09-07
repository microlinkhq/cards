import { useState, useEffect } from 'react'

import { useMountedRef } from '@/hooks'

export const FetchFactory = ({
  cache,
  children,
  fetcher = fetch,
  options,
  promiseHandler,
  url
} = {}) => {
  const [result, setResult] = useState(null)
  const isMounted = useMountedRef()

  useEffect(() => {
    async function fetchData () {
      const id = JSON.stringify({ url, ...options })

      let promise = cache.get(id)

      if (!promise) {
        promise = fetcher(url, options)
        cache.set(id, promise)
      }

      const result = await promiseHandler(promise)
      if (isMounted.current) setResult(result)
    }

    fetchData()
  }, [cache, fetcher, isMounted, url, options, promiseHandler])

  return children(result)
}

FetchFactory.defaultProps = {
  promiseHandler: promise => promise
}
