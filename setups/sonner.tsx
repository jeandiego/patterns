import { type ComponentProps } from 'react'

import { toast as sonnerToast } from 'sonner'

import { Toast } from '@/shared/components/ui/toast'

export const showToast = (toast: Omit<ComponentProps<typeof Toast>, 'id' | 'dismiss'>) => {
  return sonnerToast.custom((id) => <Toast id={id} dismiss={() => sonnerToast.dismiss(id)} {...toast} />)
}
