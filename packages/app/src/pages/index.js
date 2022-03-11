import { createElement, useEffect, useState } from 'react'
import { AppFrame, Spinner } from '@/components'
import { PreviewArea } from '@/containers'
import { useRouter } from 'next/router'

export default function Index () {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!window.location.search) {
      router.replace('/editor')
    } else {
      setIsLoading(false)
    }
  }, [router])

  return (
    <AppFrame>
      {createElement(
        isLoading ? Spinner : () => <PreviewArea isEditor={false} />
      )}
    </AppFrame>
  )
}
