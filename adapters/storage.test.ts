import { Storage } from '@/shared/lib/storage'

describe('Storage', () => {
  let storage: Storage
  const mockStorage = {
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    clear: vi.fn(),
  }

  beforeEach(() => {
    storage = new Storage(mockStorage)
  })

  it('Deve chamar o methodo get com a chave especificada', () => {
    const key = 'myKey'

    storage.get(key)

    expect(mockStorage.get).toHaveBeenCalledWith(key)
  })

  it('Deve chamar o metodo set com a chave e valor especificado', () => {
    const key = 'myKey'
    const value = 'myValue'

    storage.set(key, value)

    expect(mockStorage.set).toHaveBeenCalledWith(key, value)
  })

  it('Deve chamar o metodo delete com com a chave especificada', () => {
    const key = 'myKey'

    storage.delete(key)

    expect(mockStorage.delete).toHaveBeenCalledWith(key)
  })

  it('Deve chamar o metodo clear', () => {
    storage.clear()

    expect(mockStorage.clear).toHaveBeenCalled()
  })
})
