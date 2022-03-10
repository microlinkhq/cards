import { useCallback, useState } from 'react'
import { diff } from 'deep-object-diff'

import { debounce, isEmpty, marshall, unmarshall } from '@/lib'

const updateQuery = debounce(({ setQuery, code, queryVariables }) => {
  let newQuery = {}
  if (!isEmpty(code)) newQuery.p = marshall(code)
  if (!isEmpty(queryVariables)) newQuery = { ...newQuery, ...queryVariables }
  setQuery(newQuery)
})

export default function EditorContext (presetRef, query, setQuery) {
  const [code, setCode] = useState(() => {
    if (isEmpty(query)) return presetRef.current.code
    const { p } = query
    if (isEmpty(p)) return presetRef.current.code
    return unmarshall(p)
  })

  const [queryVariables, setQueryVariables] = useState(() => {
    if (isEmpty(query)) return presetRef.current.query
    const { p, preset: queryPreset, ...queryVariables } = query
    if (isEmpty(queryVariables)) return presetRef.current.query
    return { ...presetRef.current.query, ...queryVariables }
  })

  const handleCode = useCallback(
    newCode => {
      setCode(newCode)
      const updateQueryOpts = { code: newCode, setQuery }

      if (newCode === presetRef.current.code) {
        updateQueryOpts.queryVariables = { p: undefined }
      }

      updateQuery(updateQueryOpts)
    },
    [presetRef, setQuery]
  )

  const handleQueryVariables = useCallback(
    newJSON => {
      setQueryVariables(newJSON)
      updateQuery({
        setQuery,
        queryVariables: diff(presetRef.current.query, newJSON)
      })
    },
    [presetRef, setQuery]
  )

  return {
    code,
    handleCode,
    handleQueryVariables,
    queryVariables,
    setCode,
    setQuery,
    setQueryVariables
  }
}
