import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { DestructiveActionGuard } from '@/shared/components/destructive-action-guard'
import { AlertDialog } from '@/shared/lib/alert-dialog'

describe('DestructiveActionGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve exibir o diálogo de confirmação ao clicar no elemento filho', async () => {
    const mockShowDialog = vi.spyOn(AlertDialog, 'show')
    const handleClick = vi.fn()

    render(
      <DestructiveActionGuard>
        <button style={{ pointerEvents: 'auto' }} onClick={handleClick}>
          Deletar
        </button>
      </DestructiveActionGuard>,
    )

    const button = screen.getByText('Deletar')
    await userEvent.click(button)

    expect(mockShowDialog).toHaveBeenCalledWith({
      title: 'Você tem certeza?',
      description: 'Esta ação é irreversível. Você tem certeza que deseja continuar?',
    })
  })

  it('deve executar o onClick do filho quando o usuário confirma a ação', async () => {
    const handleClick = vi.fn()
    vi.spyOn(AlertDialog, 'show').mockResolvedValue({ value: 'confirm' })

    render(
      <DestructiveActionGuard>
        <button style={{ pointerEvents: 'auto' }} onClick={handleClick}>
          Deletar
        </button>
      </DestructiveActionGuard>,
    )

    const button = screen.getByText('Deletar')
    await userEvent.click(button)

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalled()
    })
  })

  it('não deve executar o onClick do filho quando o usuário cancela a ação', async () => {
    const handleClick = vi.fn()
    vi.spyOn(AlertDialog, 'show').mockResolvedValue({ value: 'cancel' })

    render(
      <DestructiveActionGuard>
        <button style={{ pointerEvents: 'auto' }} onClick={handleClick}>
          Deletar
        </button>
      </DestructiveActionGuard>,
    )

    const button = screen.getByText('Deletar')
    await userEvent.click(button)

    await waitFor(() => {
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  it('deve permitir personalização do título e descrição do diálogo', async () => {
    const mockShowDialog = vi.spyOn(AlertDialog, 'show')
    const customTitle = 'Título Personalizado'
    const customDescription = 'Descrição Personalizada'

    render(
      <DestructiveActionGuard title={customTitle} description={customDescription}>
        <button style={{ pointerEvents: 'auto' }} onClick={() => {}}>
          Deletar
        </button>
      </DestructiveActionGuard>,
    )

    const button = screen.getByText('Deletar')
    await userEvent.click(button)

    expect(mockShowDialog).toHaveBeenCalledWith({
      title: customTitle,
      description: customDescription,
    })
  })

  it('deve propagar propriedades adicionais para o AlertDialog', async () => {
    const mockShowDialog = vi.spyOn(AlertDialog, 'show')
    const additionalProps = {
      cancelText: 'Cancelar Personalizado',
      confirmText: 'Confirmar Personalizado',
    }

    render(
      <DestructiveActionGuard {...additionalProps}>
        <button style={{ pointerEvents: 'auto' }} onClick={() => {}}>
          Deletar
        </button>
      </DestructiveActionGuard>,
    )

    const button = screen.getByText('Deletar')
    await userEvent.click(button)

    expect(mockShowDialog).toHaveBeenCalledWith(expect.objectContaining(additionalProps))
  })
})
