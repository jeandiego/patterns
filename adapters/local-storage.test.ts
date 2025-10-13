import { Storage } from '@/shared/lib/storage'
import { localStorageAdapter } from '@/shared/lib/storage/local-storage'

let storage: Storage

beforeEach(() => {
  storage = new Storage(localStorageAdapter)
})

describe('Storage', () => {
  it('Deve obter um item do storage caso exista', () => {
    const data = { username: 'John Doe' }

    storage.set('@test', data)

    expect(storage.get<typeof data>('@test')).toEqual(data)
  })
  it('Deve salvar um item no storage', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

    storage.set('@token', token)

    expect(storage.get<string>('@token')).toBe(token)
  })
  it('Deve deletar um item do storage', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

    storage.set('@token', token)
    storage.delete('@token')

    expect(storage.get<string>('@token')).toBeNull()
  })
  it('Deve deletar multiplos itens do storage', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    const refreshToken = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    storage.set('@token', token)
    storage.set('@refresh', refreshToken)
    storage.delete(['@token', '@refresh'])

    expect(storage.get('@token')).toBeNull()
    expect(storage.get('@refresh')).toBeNull()
  })
  it('Deve limpar todos os itens do storage', () => {
    const data = { username: 'John Doe' }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

    storage.set('@test', data)
    storage.set('@token', token)
    storage.clear()

    expect(storage.get<typeof data>('@test')).toBeNull()
    expect(storage.get<string>('@token')).toBeNull()
  })
})
