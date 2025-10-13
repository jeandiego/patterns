import type { IStorage } from '@/shared/interfaces/storage'

export class Storage implements IStorage {
  constructor(private readonly storage: IStorage) {}

  get<T>(key: string): T | null {
    return this.storage.get(key)
  }

  set(key: string, value: unknown) {
    this.storage.set(key, value)
  }

  delete(key: string | string[]) {
    this.storage.delete(key)
  }
  clear() {
    this.storage.clear()
  }
}
