import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PreviewArea } from '@/containers'
import { AppFrame, Spinner } from '@/components'

export default () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!window.location.search) {
      router.replace('/editor')
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AppFrame>
      {isLoading ? (
        <Spinner style={{ margin: 'auto' }} />
      ) : (
        <PreviewArea isEditor={false} />
      )}
    </AppFrame>
  )
}
