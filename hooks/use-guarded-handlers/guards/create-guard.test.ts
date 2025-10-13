import { createGuard } from '@/shared/utils/guards/create-guard'

describe('createGuard', () => {
  it('deve chamar a fn next se condição for atendida', async () => {
    const next = vi.fn()
    const condition = vi.fn().mockResolvedValue(true)
    const guard = createGuard(condition)
    const guarded = guard(next)

    await guarded('arg1', 'arg2')

    expect(condition).toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it('deve chamar o callback onFail se a condição não for atendida', async () => {
    const next = vi.fn()
    const onFail = vi.fn()
    const condition = vi.fn().mockResolvedValue(false)
    const guard = createGuard(condition, onFail)
    const guarded = guard(next)

    await guarded('arg1')

    expect(condition).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
    expect(onFail).toHaveBeenCalled()
  })
})
