import { useCallback, useRef } from 'react'

const useDebouncedCallback = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
): ((...args: T) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        callback(...args)
      }, delay)
    },
    [callback, delay],
  )
}

export { useDebouncedCallback }
