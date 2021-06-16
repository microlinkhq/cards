import { useState, useEffect } from 'react'
import mql from '@microlink/mql'

export const MQL = ({ children, url, ...opts }) => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const result = await mql(url, opts)
      setResult(result)
    }

    fetchData()
  }, [url, opts])

  return children(result)
}
