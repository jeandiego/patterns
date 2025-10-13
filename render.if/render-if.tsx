import type { ReactElement, ReactNode } from 'react'

type TRenderProps<T = unknown> = {
  condition: T
  fallback?: ReactElement | null
  children: (condition: NonNullable<T>) => ReactNode
}

const Render = <T,>({ condition, children, fallback = null }: TRenderProps<T>) => {
  if (Array.isArray(condition) && !condition.length) return fallback
  if (!condition) return fallback
  return children(condition)
}

Render.If = Render

export { Render }
