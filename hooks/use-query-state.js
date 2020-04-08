import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const set = obj => {
    const query = { ...router.query, ...obj }
    return router.replace({ pathname: router.pathname, query })
  }
  return [router.query, set]
}
