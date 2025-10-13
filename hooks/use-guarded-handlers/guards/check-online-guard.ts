import { t } from 'i18next'

import { showToast } from '@/shared/lib/sonner'
import { createGuard } from '@/shared/utils/guards/create-guard'

export const checkOnlineGuard = <T extends unknown[]>() =>
  createGuard<T>(
    () => navigator.onLine,
    () => {
      showToast({ message: t('common:errors_gerais.sem_internet'), variant: 'error', closeButton: true })
    },
  )
