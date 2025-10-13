import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { useDebouncedCallback } from '@/shared/hooks/use-debounce-callback'

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('chama a função com atraso', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(fn, 500))

    result.current('banana')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(499)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledWith('banana')
  })

  it('reinicia o timeout se for chamado de novo antes do tempo', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(fn, 500))

    result.current('first')
    vi.advanceTimersByTime(300)

    result.current('second')
    vi.advanceTimersByTime(300)

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledWith('second')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
