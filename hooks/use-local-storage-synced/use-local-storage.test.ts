import { act } from 'react'

import { renderHook } from '@testing-library/react'

import { useLocalStorage } from '@/shared/hooks'
import { inMemoryLocalStorage } from '@/shared/tests/storage.config'
import type { storageKeys } from '@/shared/utils/constants'

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: inMemoryLocalStorage })
  inMemoryLocalStorage.clear()
})

const key = 'key' as keyof typeof storageKeys

describe('useLocalStorage Hook', () => {
  it('deve retornar o valor inicial se nenhum valor estiver armazenado no localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'valorInicial'))

    expect(result.current[0]).toBe('valorInicial')
  })

  it('deve retornar o valor do localStorage se estiver disponível', () => {
    window.localStorage.setItem(key, JSON.stringify('valorArmazenado'))

    const { result } = renderHook(() => useLocalStorage(key, 'valorInicial'))

    expect(result.current[0]).toBe('valorArmazenado')
  })

  it('deve atualizar o valor no localStorage quando setState for chamado', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'valorInicial'))

    act(() => {
      result.current[1]('novoValor')
    })

    expect(result.current[0]).toBe('novoValor')

    expect(window.localStorage.getItem(key)).toBe(JSON.stringify('novoValor'))
  })

  it('deve remover o valor do localStorage quando setState for chamado com null ou undefined', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'valorInicial'))

    act(() => {
      result.current[1]('novoValor')
    })

    act(() => {
      result.current[1](null as unknown as string)
    })

    expect(result.current[0]).toBe('valorInicial')

    expect(window.localStorage.getItem(key)).toBeNull()
  })

  it('deve chamar a função de callback no evento de storage', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useLocalStorage(key, 'valorInicial'))

    act(() => {
      window.addEventListener('storage', callback)
    })

    act(() => {
      window.localStorage.setItem(key, JSON.stringify('novoValor'))
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: key,
          newValue: JSON.stringify('novoValor'),
        }),
      )
    })

    expect(callback).toHaveBeenCalled()

    expect(result.current[0]).toBe('novoValor')

    act(() => {
      window.removeEventListener('storage', callback)
    })
  })

  it('deve atualizar corretamente o estado quando o valor for atualizado por uma função', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'valorInicial'))

    act(() => {
      result.current[1]((prev) => prev + ' atualizado')
    })

    expect(result.current[0]).toBe('valorInicial atualizado')

    expect(window.localStorage.getItem(key)).toBe(JSON.stringify('valorInicial atualizado'))
  })

  it('deve capturar erros e logar no console.warn quando ocorrer um erro ao acessar localStorage.setItem', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(window.localStorage, 'setItem').mockImplementationOnce(() => {
      throw new Error('Erro ao salvar no localStorage')
    })
    const { result } = renderHook(() => useLocalStorage(key, 'valorInicial'))

    act(() => {
      result.current[1]('valorNovo')
    })

    expect(console.warn).toHaveBeenCalledWith(
      'Error setting item to localStorage:',
      expect.objectContaining({ message: 'Erro ao salvar no localStorage' }),
    )

    vi.restoreAllMocks()
  })
})
