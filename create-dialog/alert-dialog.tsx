import { useState } from 'react'

import { Drawer } from 'vaul'

import { Icon } from '@/shared/components/icon'
import { Render } from '@/shared/components/render-if'
import { Button } from '@/shared/components/ui'
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/shared/components/ui/alert-dialog'
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/components/ui/drawer'
import { useIsMobile } from '@/shared/hooks'
import { createDialog } from '@/shared/lib/create-dialog'
import type { DialogActionValue } from '@/shared/lib/create-dialog'

type AlertDialogVariant = 'default' | 'destructive' | 'outline'

interface AlertDialogActionProps {
  title: string
  value: DialogActionValue
  variant?: AlertDialogVariant
}

interface AlertDialogOptions {
  title?: string
  description?: string
  actions?: readonly AlertDialogActionProps[]
  showCloseButton?: boolean
}

const DEFAULT_ACTIONS: readonly AlertDialogActionProps[] = [
  { title: 'Voltar', value: 'cancel', variant: 'outline' },
  { title: 'Confirmar', value: 'confirm', variant: 'default' },
] as const

type AlertDialogComponentProps = {
  options: AlertDialogOptions
  onAction: (value: DialogActionValue) => void
}

const AlertDialogComponent = ({ options, onAction }: AlertDialogComponentProps) => {
  const [open, setOpen] = useState(true)
  const actions = options.actions ?? DEFAULT_ACTIONS

  const isMobile = useIsMobile()
  const handleAction = (value: DialogActionValue) => {
    setOpen(false)
    onAction(value)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) onAction('dismiss')
  }

  const getActionClassName = (variant?: AlertDialogVariant): string | undefined => {
    return variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : undefined
  }

  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={handleOpenChange}>
        <DrawerContent className="px-2">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-6 w-6 rounded-full p-0 hover:bg-gray-100"
            onClick={() => handleAction('dismiss')}
            aria-label="Fechar"
          >
            <Icon name="close" size={24} />
          </Button>
          <DrawerHeader className="space-y-4 text-center">
            {options.title && (
              <DrawerTitle className="text-xl font-medium text-neutral-800">{options.title}</DrawerTitle>
            )}
            {options.description && (
              <DrawerDescription className="font-nunito text-base text-neutral-700">
                {options.description}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <DrawerFooter className="gap-3 px-6 pb-6">
            <div className="flex w-full flex-col gap-3">
              {actions
                ?.slice()
                .reverse()
                .map((action) => (
                  <Button
                    key={action.value}
                    variant={action.variant}
                    className="w-full"
                    onClick={() => handleAction(action.value)}
                  >
                    {action.title}
                  </Button>
                ))}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer.Root>
    )
  }

  return (
    <AlertDialogPrimitive open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="gap-6">
        <Render.If condition={options.showCloseButton}>
          {() => (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-6 w-6 rounded-full p-0 hover:bg-gray-100"
              onClick={() => handleAction('dismiss')}
              aria-label="Fechar"
            >
              <Icon name="close" size={24} />
            </Button>
          )}
        </Render.If>
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="text-xl tracking-wider">{options.title}</AlertDialogTitle>
          {options.description && (
            <AlertDialogDescription className="font-nunito text-base">{options.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {actions.map((action) =>
            action.variant === 'outline' ? (
              <AlertDialogCancel key={action.value} onClick={() => handleAction(action.value)}>
                {action.title}
              </AlertDialogCancel>
            ) : (
              <AlertDialogAction
                key={action.value}
                onClick={() => handleAction(action.value)}
                className={getActionClassName(action.variant)}
              >
                {action.title}
              </AlertDialogAction>
            ),
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPrimitive>
  )
}

const AlertDialog = createDialog(AlertDialogComponent)

export { AlertDialog }
