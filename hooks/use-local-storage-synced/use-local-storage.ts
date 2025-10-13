import { useCallback, useSyncExternalStore } from 'react'

import { storageKeys } from '@/shared/utils/constants'

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }))
}

const setLocalStorageItem = (key: string, value: unknown): void => {
  try {
    const stringifiedValue = JSON.stringify(value)
    window.localStorage.setItem(key, stringifiedValue)
    dispatchStorageEvent(key, stringifiedValue)
  } catch (e) {
    console.warn('Error setting item to localStorage:', e)
  }
}

const removeLocalStorageItem = (key: string): void => {
  window.localStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

const getLocalStorageItem = (key: string): string | null => {
  return window.localStorage.getItem(key)
}

const useLocalStorageSubscribe = (callback: (event: StorageEvent) => void): (() => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

type UseLocalStorageReturn<T> = [T, (value: T | ((prev: T) => T)) => void]

export function useLocalStorage<T>(key: keyof typeof storageKeys, initialValue: T): UseLocalStorageReturn<T> {
  const _key = storageKeys[key] || key
  const getSnapshot = (): string | null => getLocalStorageItem(_key)
  const store = useSyncExternalStore<string | null>(useLocalStorageSubscribe, getSnapshot)

  const value = store ? JSON.parse(store) : initialValue

  const setValue = useCallback(
    (v: T | ((prev: T) => T)): void => {
      const parsedStore = store ? JSON.parse(store) : initialValue
      const nextState = typeof v === 'function' ? (v as (prev: T) => T)(parsedStore) : v
      const isRemovable = nextState === undefined || nextState === null
      if (isRemovable) {
        return removeLocalStorageItem(_key)
      }
      setLocalStorageItem(_key, nextState)
    },
    [initialValue, _key, store],
  )

  return [value, setValue]
}
