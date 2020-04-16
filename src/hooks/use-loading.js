import { useState, useEffect } from 'react'
import defer from 'tickedoff'

export default fn => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fn()
    defer(() => setIsLoading(false))
  }, [])

  return isLoading
}
