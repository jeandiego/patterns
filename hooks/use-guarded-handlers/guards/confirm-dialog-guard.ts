import type { Guard } from '@/shared/interfaces'
import { AlertDialog, type DialogActionValue } from '@/shared/lib'
import { createGuard } from '@/shared/utils/guards/create-guard'

export const confirmDialogGuard = <T extends unknown[]>({
  title = 'Você tem certeza?',
  description = 'Esta ação é irreversível.',
  confirmValue = 'confirm',
}: Parameters<(typeof AlertDialog)['show']>[0] & {
  confirmValue?: DialogActionValue
}): Guard<T> =>
  createGuard<T>(async () => {
    const result = await AlertDialog.show({ title, description })
    return result.value === confirmValue
  })
