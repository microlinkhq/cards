import { useState, useEffect } from 'react'

export default fn => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fn()
    setIsLoading(false)
  }, [])

  return isLoading
}
