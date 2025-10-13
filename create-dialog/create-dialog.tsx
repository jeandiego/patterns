import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'

import { queryClient } from './react-query'

export interface DialogResult<T> {
  readonly value: DialogActionValue
  readonly data?: T
}

export type DialogActionValue = 'confirm' | 'cancel' | 'dismiss'

export type DialogComponentProps<TOptions, TResult> = {
  options: TOptions
  onAction: (value: DialogActionValue, data?: TResult) => void
}

export const createDialog = <TOptions, TResult = undefined>(
  DialogComponent: React.FC<DialogComponentProps<TOptions, TResult>>,
) => {
  return {
    show: (options: TOptions): Promise<DialogResult<TResult>> => {
      return new Promise((resolve) => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const root = createRoot(container)

        const cleanup = () => {
          root.unmount()
          container.remove()
        }

        const handleAction = (value: DialogActionValue, data?: TResult) => {
          resolve({ value, data })
          cleanup()
        }

        root.render(
          <QueryClientProvider client={queryClient}>
            <DialogComponent options={options} onAction={handleAction} />
          </QueryClientProvider>,
        )
      })
    },
  }
}
