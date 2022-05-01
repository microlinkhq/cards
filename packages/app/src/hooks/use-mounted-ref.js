import { useRef, useEffect } from 'react'

export const useMountedRef = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => (isMounted.current = false)
  }, [])

  return isMounted
}
