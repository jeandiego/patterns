import { AlertDialog } from '@/shared/lib/alert-dialog'
import { confirmDialogGuard } from '@/shared/utils/guards/confirm-dialog-guard'

vi.mock('@/shared/lib/alert-dialog', () => ({
  AlertDialog: { show: vi.fn() },
}))

describe('confirmDialogGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve prosseguir se o usuário confirmar o dialog', async () => {
    vi.mocked(AlertDialog.show).mockResolvedValue({ value: 'confirm' })
    const next = vi.fn()
    const guard = confirmDialogGuard({ title: 'Test', description: 'Are you sure?' })
    const guarded = guard(next)

    await guarded()

    expect(AlertDialog.show).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it('nao deve prosseguir se o usuário cancelar o dialog', async () => {
    vi.mocked(AlertDialog.show).mockResolvedValue({ value: 'cancel' })
    const next = vi.fn()
    const guard = confirmDialogGuard({ title: 'Test', description: 'Are you sure?' })
    const guarded = guard(next)

    await guarded()

    expect(AlertDialog.show).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })
})
