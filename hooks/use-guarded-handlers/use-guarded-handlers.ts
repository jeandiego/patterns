import { useCallback } from 'react'

import type { Guard, Handler } from '@/shared/interfaces'

export function useGuardedHandler<T extends unknown[]>(guards: Array<Guard<T>>, handler: Handler<T>): Handler<T> {
  return useCallback(
    (...args: T) => {
      const composed = guards
        .slice()
        .reverse()
        .reduce((next, guard) => guard(next), handler)

      return composed(...args)
    },
    [guards, handler],
  )
}
