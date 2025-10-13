import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { useDebounce } from '@/shared/hooks/use-debounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('devolve o valor imediatamente no início', () => {
    const { result } = renderHook(() => useDebounce('banana', 500))
    expect(result.current).toBe('banana')
  })

  it('atualiza o valor apenas após o delay', () => {
    let value = 'banana'
    const { result, rerender } = renderHook(() => useDebounce(value, 500))

    value = 'maçã'
    rerender()

    expect(result.current).toBe('banana')

    act(() => vi.advanceTimersByTime(499))
    expect(result.current).toBe('banana')

    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('maçã')
  })
})
