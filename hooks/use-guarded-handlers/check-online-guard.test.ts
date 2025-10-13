import * as toast from '@/shared/lib/sonner'
import { checkOnlineGuard } from '@/shared/utils/guards/check-online-guard'

describe('checkOnlineGuard', () => {
  vi.spyOn(toast, 'showToast')

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve prosseguir se estiver online', async () => {
    Object.defineProperty(global, 'navigator', {
      value: { onLine: true },
      configurable: true,
    })
    const next = vi.fn()
    const guarded = checkOnlineGuard()(next)

    await guarded()
    expect(next).toHaveBeenCalled()
    expect(toast.showToast).not.toHaveBeenCalled()
  })

  it('deve bloquear a acao do usuario e exibir um toast se estiver offline', async () => {
    Object.defineProperty(global, 'navigator', {
      value: { onLine: false },
      configurable: true,
    })

    const next = vi.fn()
    const guarded = checkOnlineGuard()(next)

    await guarded()
    expect(next).not.toHaveBeenCalled()
    expect(toast.showToast).toHaveBeenCalled()
  })
})
