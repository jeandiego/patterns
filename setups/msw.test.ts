import { describe, it, expect, vi, beforeEach } from 'vitest'

import { enableMSW } from '@/shared/lib'

vi.mock('@/shared/tests/browser.config', () => ({
  worker: { start: vi.fn().mockResolvedValue(undefined) },
}))

describe('enableMSW', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Deve inicializar o MSW quando estiver executando em modo de `test`', async () => {
    import.meta.env.MODE = 'test'
    const { worker } = await import('@/shared/tests/browser.config')

    await enableMSW()

    expect(worker.start).toHaveBeenCalledTimes(1)
  })

  it('Não deve inicializar o MSW quando não estiver no modo de `test`', async () => {
    import.meta.env.MODE = 'development'
    const { worker } = await import('@/shared/tests/browser.config')

    await enableMSW()

    expect(worker.start).not.toHaveBeenCalled()
  })

  it('Deve lidar com erro quando a inicialização do worker falhar', async () => {
    import.meta.env.MODE = 'test'
    const { worker } = await import('@/shared/tests/browser.config')
    const mockError = new Error('Worker start failed')
    vi.mocked(worker.start).mockRejectedValueOnce(mockError)

    await expect(enableMSW()).rejects.toThrow('Worker start failed')
  })
})
