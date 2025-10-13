import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { AlertDialog } from '@/shared/lib/alert-dialog'

describe('AlertDialog Manager', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('deve renderizar o diálogo com título e descrição corretamente', async () => {
    const options = {
      title: 'Título de Teste',
      description: 'Descrição de Teste',
    }

    await act(async () => {
      AlertDialog.show(options)
    })

    await waitFor(() => {
      expect(screen.getByText('Título de Teste')).toBeInTheDocument()
      expect(screen.getByText('Descrição de Teste')).toBeInTheDocument()
    })
  })

  it('deve renderizar botões padrão quando nenhuma ação é especificada', async () => {
    await act(async () => {
      AlertDialog.show({ title: 'Titulo', description: 'Descrição' })
    })

    await waitFor(() => {
      expect(screen.getByText('Voltar')).toBeInTheDocument()
      expect(screen.getByText('Confirmar')).toBeInTheDocument()
    })
  })

  it('deve renderizar ações personalizadas quando fornecidas', async () => {
    const options = {
      title: 'Título',
      description: 'Descrição',
      actions: [
        { title: 'Desistir', value: 'cancel', variant: 'outline' },
        { title: 'Aceitar', value: 'confirm', variant: 'destructive' },
      ] as const,
    }

    await act(async () => {
      AlertDialog.show(options)
    })

    await waitFor(() => {
      expect(screen.getByText('Desistir')).toBeInTheDocument()
      expect(screen.getByText('Aceitar')).toBeInTheDocument()
    })
  })

  it('deve aplicar classes corretas para variantes de botões', async () => {
    const options = {
      title: 'Titulo',
      description: 'Descrição',
      actions: [
        { title: 'Normal', value: 'confirm', variant: 'default' },
        { title: 'Destrutivo', value: 'cancel', variant: 'destructive' },
        { title: 'Outline', value: 'dismiss', variant: 'outline' },
      ] as const,
    }

    await act(async () => {
      AlertDialog.show(options)
    })

    const destructiveButton = screen.getByText('Destrutivo')
    expect(destructiveButton).toHaveClass('bg-destructive text-destructive-foreground')

    const outlineButton = screen.getByText('Outline')
    expect(outlineButton).toHaveClass(
      'text-sm border border-sky-700 text-sky-700 bg-foreground hover:bg-accent hover:text-sky-900 h-10',
    )

    const normalButton = screen.getByText('Normal')
    expect(normalButton).toHaveClass('bg-primary text-primary-foreground')
  })

  it('deve permitir múltiplas instâncias sequenciais do diálogo', async () => {
    const user = userEvent.setup()

    let firstDialog: Promise<{ value: string }>
    await act(async () => {
      firstDialog = AlertDialog.show({ title: 'Primeiro Diálogo', description: 'Descricao' })
    })
    await waitFor(() => {
      expect(screen.getByText('Primeiro Diálogo')).toBeInTheDocument()
    })
    await act(async () => {
      await user.click(screen.getByText('Voltar'))
    })
    await firstDialog!
    let secondDialog: Promise<{ value: string }>
    await act(async () => {
      secondDialog = AlertDialog.show({ title: 'Segundo Diálogo', description: 'Descricao' })
    })
    await waitFor(() => {
      expect(screen.getByText('Segundo Diálogo')).toBeInTheDocument()
    })
    await act(async () => {
      await user.click(screen.getByText('Voltar'))
    })

    await secondDialog!
  })
})
