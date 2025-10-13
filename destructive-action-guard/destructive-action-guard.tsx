import React, { cloneElement, memo, useCallback } from 'react'

import { AlertDialog } from '@/shared/lib/alert-dialog'

type AlertDialogOptionsType = Parameters<typeof AlertDialog.show>[0]

interface DestructiveActionGuardProps extends AlertDialogOptionsType {
  children: React.ReactElement<{ [key: string]: () => void | Promise<void> }>
  title?: string
  description?: string
  confirmValue?: string
  actionEvent?: string
  onConfirm?: () => void
}

/**
 * Protege o usuário de ações destrutivas mostrando uma caixa de diálogo de confirmação antes
 * de prosseguir com a ação.
 *
 * **IMPORTANTE**: O children deve ter exposto o onClick (actionEvent) para que o ActionGuard funcione, veja o exemplo:.
 *
 * @example Como utilizar
 *    <DestructiveActionGuard>
 *      <Button onClick={handleSairDoSimulador}>Sair do simulador</Button>
 *    </DestructiveActionGuard>
 *
 */
export const DestructiveActionGuard = memo(
  ({
    children,
    title = 'Você tem certeza?',
    description = 'Esta ação é irreversível. Você tem certeza que deseja continuar?',
    confirmValue = 'confirm',
    actionEvent = 'onClick',
    ...props
  }: DestructiveActionGuardProps) => {
    const handleClick = useCallback(async () => {
      const result = await AlertDialog.show({
        title,
        description,
        ...props,
      })
      if (result.value === confirmValue) {
        children.props[actionEvent]?.()
        props.onConfirm?.()
      }
    }, [actionEvent, children.props, confirmValue, description, props, title])

    const childWithInterceptedClick = cloneElement(children, {
      [actionEvent]: handleClick,
    })

    return childWithInterceptedClick
  },
)
