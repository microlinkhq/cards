import { useState, useEffect } from 'react'

import { useMountedRef } from '@/hooks'
import mql from '@microlink/mql'

const pending = new Map()

export const MQL = ({ children, url, options } = {}) => {
  const [result, setResult] = useState(null)
  const isMounted = useMountedRef()

  useEffect(() => {
    async function fetchData () {
      const id = JSON.stringify({ url, ...options })

      let promise = pending.get(id)

      if (!promise) {
        promise = mql(url, options)
        pending.set(id, promise)
      }

      const result = await promise
      if (isMounted.current) setResult(result)
    }

    fetchData()
  }, [isMounted, url, options])

  return children(result)
}
