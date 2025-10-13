import type { IStorage } from '@/shared/interfaces/storage'

const getItem = <T = string>(key: string): T | null => {
  const item = localStorage.getItem(key)
  if (!item) return null
  return JSON.parse(item)
}

const setItem = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

const deleteStorage = (key: string | string[]): void => {
  if (Array.isArray(key)) {
    key.forEach((element) => {
      localStorage.removeItem(element)
    })
    return
  }
  localStorage.removeItem(key)
}

const clearStorage = () => localStorage.clear()

export const localStorageAdapter: IStorage = {
  clear: clearStorage,
  delete: deleteStorage,
  get: getItem,
  set: setItem,
}
