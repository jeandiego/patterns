import { useCallback } from 'react'

import { useLocation, useNavigate, useSearchParams } from 'react-router'

type Params = Record<string, string | number | null>
type TSetFiltersOptions = {
  withTimestamp?: boolean
}

export function useSearchParamsWithTimestamp<T extends Params>() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const getParams = useCallback((): T => {
    const params: Params = {}
    searchParams.forEach((value, key) => {
      if (key !== 'run') params[key] = value
    })
    return params as T
  }, [searchParams])

  const getTimestamp = useCallback(() => {
    return Number(searchParams.get('t') ?? '0')
  }, [searchParams])

  const setFilters = useCallback(
    (newFilters: Params, options: TSetFiltersOptions = { withTimestamp: false }) => {
      const params = new URLSearchParams()
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value != null && value !== '') {
          params.set(key, String(value))
        }
      })
      if (options?.withTimestamp) {
        params.set('t', Date.now().toString())
      }
      navigate({ search: params.toString() }, { replace: false, state: location.state })
    },
    [navigate],
  )

  return { filters: getParams(), timestamp: getTimestamp(), setFilters }
}
