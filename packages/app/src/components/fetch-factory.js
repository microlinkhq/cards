import { useState, useEffect } from 'react'

import { useMountedRef } from '@/hooks'

export const FetchFactory = ({
  pending,
  children,
  fetcher,
  options,
  promiseHandler,
  url
} = {}) => {
  const [result, setResult] = useState(null)
  const isMounted = useMountedRef()

  useEffect(() => {
    async function fetchData () {
      const id = JSON.stringify({ url, ...options })

      let promise = pending.get(id)

      if (!promise) {
        promise = fetcher(url, options)
        pending.set(id, promise)
      }

      const result = await promiseHandler(promise)
      if (isMounted.current) setResult(result)
    }

    fetchData()
  }, [pending, fetcher, isMounted, url, options, promiseHandler])

  return children(result)
}

FetchFactory.defaultProps = {
  promiseHandler: promise => promise
}
