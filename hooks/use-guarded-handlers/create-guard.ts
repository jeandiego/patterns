import type { Guard, Handler } from '@/shared/interfaces'

type Condition = () => boolean | Promise<boolean>

export function createGuard<T extends unknown[] = unknown[]>(
  condition: Condition,
  onFail?: (error?: unknown) => void | Promise<void>,
): Guard<T> {
  return (next: Handler<T>): Handler<T> => {
    return async (...args: T) => {
      try {
        const result = await condition()
        if (result) {
          return next(...args)
        }
        await onFail?.()
      } catch (error) {
        await onFail?.(error)
      }
    }
  }
}
