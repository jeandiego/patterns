import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { toast, Toaster } from 'sonner'
import { describe, it, expect, vi } from 'vitest'

import { showToast } from '@/shared/lib/sonner'

describe('Toaster', () => {
  it('deve renderizar toaster wrapper corretamente', () => {
    render(<Toaster />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('exibe toast padrão corretamente', async () => {
    render(<Toaster />)

    showToast({ variant: 'info', message: 'Info message' })

    await waitFor(() => {
      const toastElement = screen.getByText('Info message')
      expect(toastElement).toBeInTheDocument()
      expect(toastElement.parentElement).toHaveClass('bg-sky-200 shadow-sm [&_button]:hover:bg-sky-200')
    })
  })

  it('exibe toast de sucesso corretamente', async () => {
    render(<Toaster />)

    showToast({ variant: 'success', message: 'Success message' })

    await waitFor(() => {
      const toastElement = screen.getByText('Success message')
      expect(toastElement).toBeInTheDocument()
      expect(toastElement.parentElement).toHaveClass('bg-green-200 shadow-sm [&_button]:hover:bg-green-200')
    })
  })

  it('deve exibir toast de erro corretamente', async () => {
    render(<Toaster />)

    showToast({ variant: 'error', message: 'Error message' })

    await waitFor(() => {
      const toastElement = screen.getByText('Error message')
      expect(toastElement).toBeInTheDocument()
      expect(toastElement?.parentElement).toHaveClass('bg-red-200 shadow-sm [&_button]:hover:bg-red-200')
    })
  })
  it('deve exibir toast de aviso corretamente', async () => {
    render(<Toaster />)

    showToast({ variant: 'warning', message: 'Warning message' })

    await waitFor(() => {
      const toastElement = screen.getByText('Warning message')
      expect(toastElement).toBeInTheDocument()
      expect(toastElement.parentElement).toHaveClass('bg-orange-200 [&_button]:hover:bg-orange-200')
    })
  })

  it('deve fechar o toast corretamente', async () => {
    render(<Toaster />)
    const onClose = vi.fn()
    const dismiss = vi.fn()
    vi.spyOn(toast, 'dismiss').mockImplementation(dismiss)
    showToast({ variant: 'info', message: 'Message with action', closeButton: true, onClose })

    await waitFor(async () => {
      const actionButton = screen.getByText('Message with action')
      expect(actionButton).toBeInTheDocument()
      fireEvent.click(screen.getByTestId('icon-circle-close'))
      expect(onClose).toBeCalled()
      expect(dismiss).toBeCalled()
    })
  })
})
